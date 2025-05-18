
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

const Profiles = () => {
  // Get today's date in YYYY-MM-DD format for the day_summary RPC call
  const today = format(new Date(), "yyyy-MM-dd");
  
  // Fetch profiles from Supabase
  const { data: profiles, isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('id,name,avatar_url,watch_connected');
      
      if (error) throw error;
      
      // For each profile, fetch their daily summary to calculate kcal ratio
      const profilesWithKcal = await Promise.all(
        profilesData.map(async (profile) => {
          const { data: summaryData } = await supabase
            .rpc('day_summary', { 
              _pid: profile.id, 
              _d: today 
            });
          
          // Get the summary data or default values
          const summary = summaryData?.[0] || { kcal: 0, prot: 0, fat: 0, carb: 0 };
          const dailyGoal = 2000; // Default goal
          
          return {
            ...profile,
            kcalRatio: summary.kcal / dailyGoal, // Calculate the ratio
            currentKcal: summary.kcal,
            dailyGoal,
            prot: summary.prot,
            fat: summary.fat,
            carb: summary.carb
          };
        })
      );
      
      return profilesWithKcal;
    }
  });

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
          ) : (
            <div className="space-y-4">
              {profiles?.map((profile) => (
                <Link key={profile.id} to={`/profiles/${profile.id}`}>
                  <ProfileCard 
                    profile={{
                      id: profile.id,
                      name: profile.name || 'Unnamed User',
                      avatar: profile.avatar_url,
                      kcalRatio: profile.kcalRatio,
                      currentKcal: profile.currentKcal,
                      dailyGoal: profile.dailyGoal,
                      watch_connected: profile.watch_connected,
                      prot: profile.prot,
                      fat: profile.fat,
                      carb: profile.carb
                    }} 
                  />
                </Link>
              ))}
              {profiles?.length === 0 && (
                <p className="text-muted-foreground py-4 text-center">
                  No profiles found. Add profiles in your Supabase database.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
