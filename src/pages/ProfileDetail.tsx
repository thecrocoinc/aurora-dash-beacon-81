import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import KcalRing from "@/components/KcalRing";
import MasonryGrid from "@/components/MasonryGrid";
import MealGridSkeleton from "@/components/MealGridSkeleton";
import MacroChips from "@/components/MacroChips";
import MealTilePlaceholder from "@/components/MealTilePlaceholder";
import { RadarChart } from "@/components/RadarChart";
import { WaterRing } from "@/components/WaterRing";
import { WeightHistoryChart } from "@/components/WeightHistoryChart";
import { MeasurementsTable } from "@/components/MeasurementsTable";
import { GoalStatusBadge } from "@/components/GoalStatusBadge";
import ChatInterface from "@/components/ChatInterface";

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

  // Fetch fitness goals
  const { data: goals } = useQuery({
    queryKey: ['fitness-goals', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fitness_goals')
        .select('*')
        .eq('profile_id', id)
        .order('created_at', { ascending: false });
      
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
        <h1 className="text-3xl font-bold tracking-tight">Профиль клиента</h1>
        <p className="text-muted-foreground">
          Профиль не найден для ID: {id}
        </p>
      </div>
    );
  }

  const initials = profile.name
    ?.split(" ")
    .map((n) => n[0])
    .join("") || "";
    
  // Format client information
  const age = profile.birthdate ? 
    Math.floor((new Date().getTime() - new Date(profile.birthdate).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 
    null;
  
  const bmi = (profile.weight && profile.height) ? 
    (profile.weight / Math.pow(profile.height/100, 2)).toFixed(1) : 
    null;

  const activityLevelMap: Record<string, string> = {
    'sedentary': 'Сидячий',
    'light': 'Лёгкая активность',
    'moderate': 'Умеренная активность',
    'active': 'Активный',
    'very_active': 'Очень активный',
  };

  const goalTypeMap: Record<string, string> = {
    'weight_loss': 'Снижение веса',
    'weight_gain': 'Набор массы',
    'maintenance': 'Поддержание веса',
    'athlete': 'Спортивные результаты',
  };

  // Create placeholder meals for empty state
  const placeholderMeals = Array.from({ length: 6 }).map((_, i) => (
    <MealTilePlaceholder key={`placeholder-${i}`} />
  ));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url ? `${profile.avatar_url}?w=160&h=160&fit=crop&crop=faces` : undefined} alt={profile?.name} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{profile?.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.goal_type && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {goalTypeMap[profile.goal_type] || profile.goal_type}
                </Badge>
              )}
              {profile.gender && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {profile.gender === 'male' ? 'Мужчина' : 'Женщина'}
                </Badge>
              )}
              {age && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                  {age} лет
                </Badge>
              )}
              {profile.activity_level && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {activityLevelMap[profile.activity_level] || profile.activity_level}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue={profile?.goal_type || "maintenance"}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Тип цели" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight_loss">Снижение веса</SelectItem>
              <SelectItem value="weight_gain">Набор массы</SelectItem>
              <SelectItem value="maintenance">Поддержание</SelectItem>
              <SelectItem value="athlete">Спортивные результаты</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {profile.notes && (
        <Card className="bg-zinc-900/80">
          <CardContent className="pt-4">
            <div className="text-zinc-300">
              <p className="italic">{profile.notes}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="nutrition">Питание</TabsTrigger>
          <TabsTrigger value="progress">Прогресс</TabsTrigger>
          <TabsTrigger value="chat">Чат</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Персональные данные</CardTitle>
                <CardDescription>Основная информация о клиенте</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Рост</p>
                    <p className="font-medium">{profile.height ? `${profile.height} см` : "Не указан"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Вес</p>
                    <p className="font-medium">{profile.weight ? `${profile.weight} кг` : "Не указан"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Целевой вес</p>
                    <p className="font-medium">{profile.target_weight ? `${profile.target_weight} кг` : "Не указан"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ИМТ</p>
                    <p className="font-medium">{bmi ? `${bmi}` : "Не рассчитан"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Диетические ограничения</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.dietary_restrictions && profile.dietary_restrictions.length > 0 ? (
                        profile.dietary_restrictions.map((restriction, index) => (
                          <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                            {restriction}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm">Нет ограничений</p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Медицинские показания</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.medical_conditions && profile.medical_conditions.length > 0 ? (
                        profile.medical_conditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="bg-amber-50 text-amber-700">
                            {condition}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm">Нет показаний</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Цели фитнеса</CardTitle>
                <CardDescription>Установленные цели клиента</CardDescription>
              </CardHeader>
              <CardContent>
                {goals && goals.length > 0 ? (
                  <div className="space-y-3">
                    {goals.map((goal) => (
                      <div key={goal.id} className="border p-3 rounded-md">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{goal.description}</div>
                          <GoalStatusBadge achieved={goal.achieved} />
                        </div>
                        {goal.target_date && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Целевая дата: {format(new Date(goal.target_date), "d MMMM yyyy", { locale: ru })}
                          </p>
                        )}
                        {goal.target_value && (
                          <p className="text-sm mt-1">
                            Цель: {goal.target_value} {goal.goal_type === 'weight' ? 'кг' : ''}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Нет установленных целей</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Дневная норма</CardTitle>
                <CardDescription>Прогресс по калориям</CardDescription>
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
                <CardTitle>Приемы пищи</CardTitle>
                <CardDescription>Записи о еде</CardDescription>
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

        <TabsContent value="nutrition" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RadarChart />
            <WaterRing />
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>История изменения веса</CardTitle>
                <CardDescription>Динамика веса клиента</CardDescription>
              </CardHeader>
              <CardContent>
                <WeightHistoryChart profileId={id!} targetWeight={profile.target_weight} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Измерения тела</CardTitle>
                <CardDescription>История измерений</CardDescription>
              </CardHeader>
              <CardContent>
                <MeasurementsTable profileId={id!} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

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
