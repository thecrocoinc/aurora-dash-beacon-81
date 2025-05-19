
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import ChatInterface from "@/components/ChatInterface";

// Import refactored components
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PersonalDataCard } from "@/components/profile/PersonalDataCard";
import { FitnessGoalsCard } from "@/components/profile/FitnessGoalsCard";
import { DailyNutritionCard } from "@/components/profile/DailyNutritionCard";
import { ProfileMealsCard } from "@/components/profile/ProfileMealsCard";
import { ProfileNotesCard } from "@/components/profile/ProfileNotesCard";
import ProfileNutritionTab from "@/components/profile/ProfileNutritionTab";
import ProfileProgressTab from "@/components/profile/ProfileProgressTab";

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const today = format(new Date(), "yyyy-MM-dd");
  const [kcalRatio, setKcalRatio] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  
  // Fetch profile data with extended information
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, avatar_url, goal_type, weight, height, target_weight, birthdate, gender, activity_level, dietary_restrictions, medical_conditions, notes')
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

  if (loading && !profile) {
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
        <h1 className="text-3xl font-bold tracking-tight">Профиль клиента</h1>
        <p className="text-muted-foreground">
          Профиль не найден для ID: {id}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader profile={profile} profileLoading={profileLoading} />
      
      {/* Profile Notes */}
      <ProfileNotesCard notes={profile.notes} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="nutrition">Питание</TabsTrigger>
          <TabsTrigger value="progress">Прогресс</TabsTrigger>
          <TabsTrigger value="chat">Чат</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Data Card */}
            <PersonalDataCard profile={profile} />
            
            {/* Fitness Goals Card */}
            <FitnessGoalsCard profileId={id!} />
            
            {/* Daily Nutrition Card */}
            <DailyNutritionCard 
              calories={summary?.kcal || 0}
              protein={summary?.prot || 0}
              fat={summary?.fat || 0}
              carbs={summary?.carb || 0}
              target={dailyGoal}
            />
            
            {/* Meals Card */}
            <ProfileMealsCard 
              meals={meals || []}
              isLoading={mealsLoading}
            />
          </div>
        </TabsContent>

        {/* Nutrition Tab */}
        <TabsContent value="nutrition" className="mt-6">
          <ProfileNutritionTab />
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="mt-6">
          <ProfileProgressTab profileId={id!} targetWeight={profile.target_weight} />
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat" className="mt-6">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Диалог с клиентом</CardTitle>
              <CardDescription>Консультация по питанию</CardDescription>
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
