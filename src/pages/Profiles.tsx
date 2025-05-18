
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import { fakeProfiles } from "@/utils/dummy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Profiles = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Profiles</h1>
      <p className="text-muted-foreground">
        View and manage user nutrition profiles.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all user profiles in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
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
          ) : (
            <div className="space-y-4">
              {fakeProfiles.map((profile) => (
                <Link key={profile.id} to={`/profiles/${profile.id}`}>
                  <ProfileCard profile={profile} />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
