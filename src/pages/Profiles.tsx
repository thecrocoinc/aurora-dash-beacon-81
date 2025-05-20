
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useProfilesData } from "@/hooks/useProfilesData";
import ProfilesError from "@/components/profiles/ProfilesError";
import SearchAndFilters from "@/components/profiles/SearchAndFilters";
import ProfilesLoading from "@/components/profiles/ProfilesLoading";
import ProfilesList from "@/components/profiles/ProfilesList";
import { ProfilesStats } from "@/components/profiles/ProfilesStats";
import { useToast } from "@/hooks/use-toast";
import { ProfileWithDetails } from "@/types/profile";

// Get saved filter from localStorage
const getSavedFilter = (): string | null => {
  return localStorage.getItem("profilesActiveFilter");
};

const Profiles = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(getSavedFilter());
  const { profiles, isLoading, isError, error, refreshProfiles } = useProfilesData();
  
  // Save active filter to localStorage when it changes
  useEffect(() => {
    if (activeFilter) {
      localStorage.setItem("profilesActiveFilter", activeFilter);
    } else {
      localStorage.removeItem("profilesActiveFilter");
    }
  }, [activeFilter]);
  
  // Filter profiles by search query and active filter
  const filteredProfiles = profiles?.filter(profile => {
    // Filter by search query
    const matchesSearch = profile.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         profile.username?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         false;
    
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
            <ProfilesLoading viewMode="list" />
          ) : isError ? (
            <div className="text-center text-red-500 py-8">
              <p>Не удалось загрузить данные профилей.</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary text-white rounded" 
                onClick={refreshProfiles}
              >
                Попробовать снова
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Results counter */}
              <div className="text-sm text-muted-foreground mb-2">
                {filteredProfiles && filteredProfiles.length > 0 
                  ? `Найдено: ${filteredProfiles.length} ${activeFilter ? 'с фильтром' : ''}`
                  : 'Нет результатов'
                }
                {activeFilter && (
                  <span className="ml-1 px-1.5 py-0.5 bg-muted rounded-md text-xs">
                    {activeFilter === "active" ? "Premium" :
                     activeFilter === "trial" ? "Trial" :
                     activeFilter === "weight_loss" ? "Снижение веса" :
                     activeFilter === "weight_gain" ? "Набор веса" :
                     activeFilter === "maintenance" ? "Поддержание" : activeFilter}
                  </span>
                )}
              </div>
              
              <ProfilesList profiles={filteredProfiles as ProfileWithDetails[]} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
