
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import KcalRing from "@/components/KcalRing";
import MealTile from "@/components/MealTile";
import ChatInterface from "@/components/ChatInterface";
import MasonryGrid from "@/components/MasonryGrid";
import MealGridSkeleton from "@/components/MealGridSkeleton";
import MacroChips from "@/components/MacroChips";
import MealTilePlaceholder from "@/components/MealTilePlaceholder";
import { RadarChart } from "@/components/RadarChart";
import { WaterRing } from "@/components/WaterRing";

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const today = format(new Date(), "yyyy-MM-dd");
  const [kcalRatio, setKcalRatio] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  
  // Fetch profile data
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, avatar_url, goal_type')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  // Fetch day summary for calories
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['day-summary', id, today],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('day_summary', { 
          _pid: id, 
          _d: today 
        });
      
      if (error) throw error;
      return data?.[0] || { kcal: 0, prot: 0, fat: 0, carb: 0 };
    },
    enabled: !!id
  });

  // Update kcalRatio when summary changes
  useEffect(() => {
    if (summary) {
      setKcalRatio(summary.kcal / dailyGoal || 0);
    }
  }, [summary, dailyGoal]);

  // Fetch meals for this profile
  const { data: meals, isLoading: mealsLoading } = useQuery({
    queryKey: ['profile-meals', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meals')
        .select('id,dish,grams,photo_id,eaten_at,kcal,prot,fat,carb')
        .eq('profile_id', id)
        .order('eaten_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!id
  });

  const loading = profileLoading || summaryLoading || mealsLoading;

  if (loading && !meals) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">
          Profile not found for ID: {id}
        </p>
      </div>
    );
  }

  const initials = profile.name
    ?.split(" ")
    .map((n) => n[0])
    .join("") || "";
    
  // Create placeholder meals for empty state
  const placeholderMeals = Array.from({ length: 6 }).map((_, i) => (
    <MealTilePlaceholder key={`placeholder-${i}`} />
  ));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url ? `${profile.avatar_url}?w=160&h=160&fit=crop&crop=faces` : undefined} alt={profile?.name} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{profile?.name}</h1>
            <p className="text-muted-foreground">ID: {profile?.id}</p>
          </div>
        </div>
        <Select defaultValue={profile?.goal_type || "Maintain"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Goal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lose">Lose Weight</SelectItem>
            <SelectItem value="Gain">Gain Weight</SelectItem>
            <SelectItem value="Maintain">Maintain Weight</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Nutrition</CardTitle>
                <CardDescription>Calorie intake progress</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <KcalRing value={summary?.kcal || 0} target={dailyGoal} />
                <MacroChips 
                  protein={summary?.prot} 
                  fat={summary?.fat} 
                  carbs={summary?.carb}
                  className="mt-4" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Today's Meals</CardTitle>
                <CardDescription>Logged food items</CardDescription>
              </CardHeader>
              <CardContent>
                {mealsLoading ? (
                  <MealGridSkeleton />
                ) : meals && meals.length > 0 ? (
                  <MasonryGrid meals={meals} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {placeholderMeals}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RadarChart />
            <WaterRing />
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Nutrition Coaching</CardTitle>
              <CardDescription>Chat with your nutrition coach</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-96px)]">
              <ChatInterface profileId={id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDetail;
