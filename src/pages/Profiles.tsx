
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Filter, Search, ArrowUpDown } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { EmptyBanner } from "@/components/EmptyBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const goalTypeLabels: Record<string, string> = {
  "weight_loss": "Снижение веса",
  "weight_gain": "Набор массы",
  "maintenance": "Поддержание формы",
  "athlete": "Спорт",
};

const statusColors: Record<string, string> = {
  "active": "bg-emerald-100 text-emerald-800",
  "expired": "bg-red-100 text-red-800",
  "trial": "bg-amber-100 text-amber-800",
};

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
                kcalRatio: summary.kcal / dailyGoal,
                currentKcal: summary.kcal,
                dailyGoal,
                prot: summary.prot,
                fat: summary.fat,
                carb: summary.carb,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
          <p className="text-muted-foreground mt-1">
            Управление профилями пользователей и их питанием
          </p>
        </div>
        
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Добавить клиента
        </Button>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Сортировка
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>По имени (А-Я)</DropdownMenuItem>
            <DropdownMenuItem>По имени (Я-А)</DropdownMenuItem>
            <DropdownMenuItem>По дате регистрации (новые)</DropdownMenuItem>
            <DropdownMenuItem>По дате регистрации (старые)</DropdownMenuItem>
            <DropdownMenuItem>По последней активности</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="cards">
        <TabsList className="mb-4">
          <TabsTrigger value="cards">Карточки</TabsTrigger>
          <TabsTrigger value="table">Таблица</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards">
          <Card>
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
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
                <div className="space-y-4">
                  {filteredProfiles.map((profile) => (
                    <Link key={profile.id} to={`/profiles/${profile.id}`}>
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
        </TabsContent>
        
        <TabsContent value="table">
          <Card>
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="w-full">
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-8 w-full mb-4" />
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
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Цель</TableHead>
                        <TableHead>Прогресс</TableHead>
                        <TableHead>Серия дней</TableHead>
                        <TableHead>Последняя активность</TableHead>
                        <TableHead>Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell>
                            <Link to={`/profiles/${profile.id}`} className="flex items-center gap-2 hover:underline">
                              {profile.name}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {profile.goal_type ? goalTypeLabels[profile.goal_type] : "Не указана"}
                          </TableCell>
                          <TableCell>
                            <div className="w-full max-w-[100px]">
                              <div className="h-2 w-full bg-gray-200 rounded-full">
                                <div 
                                  className="h-2 bg-green-500 rounded-full" 
                                  style={{width: `${Math.min(100, Math.round(profile.kcalRatio * 100))}%`}}
                                />
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {Math.round(profile.kcalRatio * 100)}% дневной нормы
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50">
                              {profile.streak_days} дней
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {profile.last_activity}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[profile.subscription_status]}>
                              {profile.subscription_status === 'active' ? 'Активна' : 
                              profile.subscription_status === 'trial' ? 'Пробная' : 'Истекла'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profiles;
