
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useProfilesData } from "@/hooks/useProfilesData";
import ProfilesError from "@/components/profiles/ProfilesError";
import SearchAndFilters from "@/components/profiles/SearchAndFilters";
import ProfilesLoading from "@/components/profiles/ProfilesLoading";
import ProfilesGrid from "@/components/profiles/ProfilesGrid";

const Profiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { profiles, isLoading, isError, error } = useProfilesData();
  
  // Filter profiles based on search query
  const filteredProfiles = profiles?.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Search and filter row */}
      <SearchAndFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <ProfilesLoading />
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
            <ProfilesGrid profiles={filteredProfiles} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
