
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useProfilesData } from "@/hooks/useProfilesData";
import ProfilesError from "@/components/profiles/ProfilesError";
import SearchAndFilters from "@/components/profiles/SearchAndFilters";
import ProfilesLoading from "@/components/profiles/ProfilesLoading";
import ProfilesGrid from "@/components/profiles/ProfilesGrid";
import ProfilesList from "@/components/profiles/ProfilesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, LayoutList } from "lucide-react";
import { ProfilesStats } from "@/components/profiles/ProfilesStats";

// Using the updated interface with subscription_status as string
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
  subscription_status?: string;
}

const Profiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { profiles, isLoading, isError, error } = useProfilesData();
  
  // Сразу фильтруем профили по поисковому запросу и активному фильтру
  const filteredProfiles = profiles?.filter(profile => {
    // Filter by search query
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected filter if any
    if (activeFilter) {
      switch (activeFilter) {
        case "active":
          return matchesSearch && profile.subscription_status === "active";
        case "trial":
          return matchesSearch && profile.subscription_status === "trial";
        case "weight_loss":
          return matchesSearch && profile.goal_type === "weight_loss";
        case "weight_gain":
          return matchesSearch && profile.goal_type === "weight_gain";
        case "maintenance":
          return matchesSearch && profile.goal_type === "maintenance";
        default:
          return matchesSearch;
      }
    }
    
    return matchesSearch;
  });

  if (error) {
    return <ProfilesError error={error} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
        <p className="text-muted-foreground mt-1">
          Управление профилями пользователей и их питанием
        </p>
      </div>

      {/* Statistics Panel */}
      {!isLoading && !isError && profiles && <ProfilesStats profiles={profiles} />}

      {/* Search and filter row */}
      <SearchAndFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <ProfilesLoading viewMode={viewMode} />
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
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")} className="w-auto">
                  <TabsList className="bg-muted/80">
                    <TabsTrigger value="grid" className="flex items-center gap-1">
                      <LayoutGrid className="h-4 w-4" /> Сетка
                    </TabsTrigger>
                    <TabsTrigger value="list" className="flex items-center gap-1">
                      <LayoutList className="h-4 w-4" /> Список
                    </TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="grid" className="mt-0">
                    <ProfilesGrid profiles={filteredProfiles} />
                  </TabsContent>
                  
                  <TabsContent value="list" className="mt-0">
                    <ProfilesList profiles={filteredProfiles} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
