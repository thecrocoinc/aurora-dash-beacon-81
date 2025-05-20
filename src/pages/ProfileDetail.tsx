
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
import { ProfileExtended, Digest, Meal } from '@/types/profile';

type ExtendedMeal = {
  id: string;
  dish: string;
  grams: number;
  photo_id?: string;
  eaten_at: string;
  kcal?: number;
  prot?: number;
  fat?: number;
  carb?: number;
};

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
        .select('id, first_name, username, telegram_id, created_at, locale')
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
  const { data: digestData, isLoading: summaryLoading } = useQuery({
    queryKey: ['day-summary', id, today],
    queryFn: async () => {
      if (!profile?.telegram_id) return null;
      
      const { data, error } = await supabase
        .rpc('get_current_summary', { 
          _chat_id: profile.telegram_id
        });
      
      if (error) throw error;
      
      // Cast to Digest type with proper typing
      const digest: Digest = {
        kcal: typeof data?.kcal === 'number' ? data.kcal : 0,
        prot: typeof data?.prot === 'number' ? data.prot : 0,
        fat: typeof data?.fat === 'number' ? data.fat : 0,
        carb: typeof data?.carb === 'number' ? data.carb : 0,
        summary_md: typeof data?.summary_md === 'string' ? data.summary_md : ''
      };
      
      return digest;
    },
    enabled: !!profile?.telegram_id
  });

  // Cast summary data to the correct type
  const summary = digestData || { kcal: 0, prot: 0, fat: 0, carb: 0, summary_md: '' };

  // Update kcalRatio when summary changes
  useEffect(() => {
    if (summary) {
      setKcalRatio(summary.kcal / dailyGoal || 0);
    }
  }, [summary, dailyGoal]);

  // Fetch meals for this profile
  const { data: mealsData, isLoading: mealsLoading } = useQuery({
    queryKey: ['profile-meals', id],
    queryFn: async () => {
      if (!profile?.telegram_id) return [];
      
      try {
        const { data, error } = await supabase
          .from('meals')
          .select('id, dish, grams, eaten_at, kcal, prot, fat, carb')
          .eq('chat_id', profile.telegram_id)
          .order('eaten_at', { ascending: false })
          .limit(20);
        
        if (error) throw error;
        
        // Map meals to the correct type with string IDs
        const mappedMeals = (data || []).map(meal => ({
          ...meal,
          id: meal.id.toString(),
          // Add required fields for compatibility with existing components
          photo_id: undefined,
          chat_id: profile.telegram_id,
          deleted: false
        })) as unknown as ExtendedMeal[];
        
        return mappedMeals;
      } catch (error) {
        console.error("Error fetching meals:", error);
        return [];
      }
    },
    enabled: !!profile?.telegram_id
  });

  // Ensure meals is always an array
  const meals = mealsData || [];

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

  // Create the profile object with expected properties for ProfileHeader
  const headerProfile = {
    id: profile.id,
    first_name: profile.first_name,
    username: profile.username,
    goal_type: profile.goal_type,
    subscription_status: profile.subscription_status,
    avatar: null
  };

  return (
    <div className="space-y-6">
      <ProfileHeader profile={headerProfile} />

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
            meals={meals as any} 
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
