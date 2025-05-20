
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileLoading from "@/components/profile/ProfileLoading";
import OverviewTab from "@/components/profile/OverviewTab";
import InsightsTab from "@/components/profile/InsightsTab";
import ChatTab from "@/components/profile/ChatTab";
import { Database } from '@/supabase/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileExtended extends Profile {
  goal_type?: string;
  subscription_status?: string;
  weight?: number;
  height?: number;
  target_weight?: number;
  avatar_url?: string | null;
}

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const today = format(new Date(), "yyyy-MM-dd");
  const [kcalRatio, setKcalRatio] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  
  // Fetch profile data with metrics
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, username, telegram_id, created_at')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Add simulated data that's not in our real DB
      const enhanced: ProfileExtended = {
        ...data,
        goal_type: ['weight_loss', 'weight_gain', 'maintenance'][Math.floor(Math.random() * 3)],
        subscription_status: ['active', 'trial'][Math.floor(Math.random() * 2)],
        height: 175 + Math.floor(Math.random() * 20),
        weight: 70 + Math.floor(Math.random() * 30),
        target_weight: 65 + Math.floor(Math.random() * 20)
      };
      
      return enhanced;
    },
    enabled: !!id
  });

  // Fetch day summary for calories
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['day-summary', id, today],
    queryFn: async () => {
      if (!profile?.telegram_id) return null;
      
      const { data, error } = await supabase
        .rpc('get_current_summary', { 
          _chat_id: profile.telegram_id
        });
      
      if (error) throw error;
      return data || { kcal: 0, prot: 0, fat: 0, carb: 0 };
    },
    enabled: !!profile?.telegram_id
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
      if (!profile?.telegram_id) return [];
      
      const { data, error } = await supabase
        .from('meals')
        .select('id,dish,grams,eaten_at,kcal,prot,fat,carb')
        .eq('chat_id', profile.telegram_id)
        .order('eaten_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!profile?.telegram_id
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
            profile={profile}
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
