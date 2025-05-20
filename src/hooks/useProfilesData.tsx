
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

interface ProfileData {
  id: string;
  name: string | null;
  avatar_url: string | null;
  goal_type?: string | null;
  created_at?: string | null;
  subscription_status?: string;
}

export interface ProfileWithDetails {
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

export const useProfilesData = () => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Get today's date in YYYY-MM-DD format for the day_summary RPC call
  const today = format(new Date(), "yyyy-MM-dd");
  
  // Fetch profiles from Supabase with improved caching
  const { data: profiles, isLoading, isError } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      try {
        const { data: profilesData, error } = await supabase
          .from('profiles')
          .select('id,name,avatar_url,goal_type,created_at,subscription_status');
        
        if (error) {
          console.error("Error fetching profiles:", error);
          throw error;
        }
        
        // For each profile, fetch their daily summary to calculate kcal ratio
        const profilesWithKcal = await Promise.all(
          (profilesData || []).map(async (profile: ProfileData, index: number) => {
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
              
              // For the first 5 profiles, ensure they don't have actual photos
              const avatar = index < 5 ? null : profile.avatar_url;
              
              return {
                id: profile.id,
                name: profile.name || 'Unnamed User',
                avatar: avatar,
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
                subscription_status: profile.subscription_status,
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
                subscription_status: profile.subscription_status || 'basic',
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
    staleTime: 1000 * 60 * 5, // 5 minutes before data is considered stale
    refetchOnWindowFocus: false,
    retry: 1
  });

  // Function to force refresh profiles data (manually invalidate cache)
  const refreshProfiles = () => {
    queryClient.invalidateQueries({ queryKey: ['profiles'] });
  };

  return { profiles, isLoading, isError, error, refreshProfiles };
};
