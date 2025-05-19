
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileLoading from "@/components/profile/ProfileLoading";
import OverviewTab from "@/components/profile/OverviewTab";
import InsightsTab from "@/components/profile/InsightsTab";
import ChatTab from "@/components/profile/ChatTab";

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
    return <ProfileLoading />;
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Профиль пользователя</h1>
        <p className="text-muted-foreground">
          Профиль не найден
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="insights">Анализ</TabsTrigger>
          <TabsTrigger value="chat">Чат</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <OverviewTab 
            summary={summary} 
            dailyGoal={dailyGoal} 
            meals={meals} 
            mealsLoading={mealsLoading} 
          />
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <InsightsTab />
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <ChatTab profileId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDetail;
