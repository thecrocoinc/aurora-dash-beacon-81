import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, UserPlus } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { EmptyBanner } from "@/components/EmptyBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define a proper type for profile data
interface ProfileData {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

interface ProfileWithDetails {
  id: string;
  name: string;
  avatar: string | null;
  watch_connected: boolean;
  kcalRatio: number;
  currentKcal: number;
  dailyGoal: number;
  prot: number;
  fat: number;
  carb: number;
  goal_type?: string | null;
  created_at?: string | null;
  last_activity?: string | null;
  streak_days?: number;
  subscription_status?: 'active' | 'expired' | 'trial';
}

const Profiles = () => {
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get today's date in YYYY-MM-DD format for the day_summary RPC call
  const today = format(new Date(), "yyyy-MM-dd");
  
  // Fetch profiles from Supabase
  const { data: profiles, isLoading, isError } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      try {
        const { data: profilesData, error } = await supabase
          .from('profiles')
          .select('id,name,avatar_url,goal_type,created_at');
        
        if (error) {
          console.error("Error fetching profiles:", error);
          throw error;
        }
        
        // For each profile, fetch their daily summary to calculate kcal ratio
        const profilesWithKcal = await Promise.all(
          (profilesData || []).map(async (profile: ProfileData & { goal_type?: string, created_at?: string }) => {
            try {
              const { data: summaryData, error: summaryError } = await supabase
                .rpc('day_summary', { 
                  _pid: profile.id, 
                  _d: today 
                });
              
              if (summaryError) {
                console.warn("Error fetching summary for profile:", profile.id, summaryError);
              }
              
              // Get the summary data or default values
              const summary = summaryData?.[0] || { kcal: 0, prot: 0, fat: 0, carb: 0 };
              
              // Calculate daily goal based on goal type (this is just a simulation)
              const dailyGoal = profile.goal_type === 'weight_loss' ? 1800 : 
                              profile.goal_type === 'weight_gain' ? 2600 : 
                              profile.goal_type === 'athlete' ? 2800 : 2000;
              
              // For demo purposes, generate realistic macro values 
              const currentKcal = Math.floor(dailyGoal * (0.6 + Math.random() * 0.3)); // 60%-90% of goal
              const prot = Math.floor(currentKcal * 0.25 / 4); // ~25% from protein (4 kcal per gram)
              const fat = Math.floor(currentKcal * 0.30 / 9); // ~30% from fat (9 kcal per gram)
              const carb = Math.floor(currentKcal * 0.45 / 4); // ~45% from carbs (4 kcal per gram)
              
              // Simulate some additional data
              const createdDate = profile.created_at ? new Date(profile.created_at) : new Date();
              const daysSinceCreation = Math.floor((new Date().getTime() - createdDate.getTime()) / (1000 * 3600 * 24));
              
              const hasWatch = Math.random() > 0.6; // 40% chance to have a connected watch
              const streak = Math.floor(Math.random() * 30); // Random streak between 0-30 days
              const lastActivity = new Date(new Date().getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
              
              // Simulate subscription status
              const subscriptionStatus = Math.random() > 0.7 ? 'active' : 
                                      Math.random() > 0.5 ? 'trial' : 'expired';
              
              return {
                id: profile.id,
                name: profile.name || 'Unnamed User',
                avatar: profile.avatar_url,
                watch_connected: hasWatch,
                kcalRatio: currentKcal / dailyGoal,
                currentKcal,
                dailyGoal,
                prot,
                fat,
                carb,
                goal_type: profile.goal_type,
                created_at: profile.created_at,
                last_activity: format(lastActivity, "yyyy-MM-dd HH:mm"),
                streak_days: streak,
                subscription_status: subscriptionStatus as 'active' | 'expired' | 'trial',
              };
            } catch (err) {
              console.error("Error processing profile summary:", err);
              return {
                id: profile.id,
                name: profile.name || 'Unnamed User',
                avatar: profile.avatar_url,
                watch_connected: false,
                kcalRatio: 0,
                currentKcal: 0,
                dailyGoal: 2000,
                prot: 0,
                fat: 0,
                carb: 0,
                goal_type: profile.goal_type,
                created_at: profile.created_at,
                streak_days: 0,
                subscription_status: 'expired' as const,
              };
            }
          })
        );
        
        return profilesWithKcal;
      } catch (err) {
        console.error("Error in query function:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        return [];
      }
    },
    retry: 1,
    refetchOnWindowFocus: false
  });

  // Filter profiles based on search query
  const filteredProfiles = profiles?.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
        <Card className="p-6">
          <div className="text-center text-red-500">
            <p>Произошла ошибка при загрузке данных:</p>
            <p className="font-mono text-sm">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded" 
              onClick={() => window.location.reload()}
            >
              Обновить страницу
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
        <p className="text-muted-foreground mt-1">
          Управление профилями пользователей и их питанием
        </p>
      </div>

      {/* Search and filter row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск клиентов..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Фильтровать по</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Все клиенты</DropdownMenuItem>
            <DropdownMenuItem>Активная подписка</DropdownMenuItem>
            <DropdownMenuItem>Пробный период</DropdownMenuItem>
            <DropdownMenuItem>Истекшая подписка</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Снижение веса</DropdownMenuItem>
            <DropdownMenuItem>Набор массы</DropdownMenuItem>
            <DropdownMenuItem>Поддержание формы</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-[80%]" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-500 py-8">
              <p>Не удалось загрузить данные профилей.</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary text-white rounded" 
                onClick={() => window.location.reload()}
              >
                Попробовать снова
              </button>
            </div>
          ) : filteredProfiles && filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProfiles.map((profile) => (
                <Link key={profile.id} to={`/profiles/${profile.id}`} className="block h-full">
                  <ProfileCard profile={profile} />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyBanner
              icon={UserPlus}
              title="Нет клиентов"
              subtitle="Подключите ваш Telegram-бот чтобы видеть живые данные"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
