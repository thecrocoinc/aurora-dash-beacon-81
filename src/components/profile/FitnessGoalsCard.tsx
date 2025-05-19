
import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalStatusBadge } from "@/components/GoalStatusBadge";

interface FitnessGoalsCardProps {
  profileId: string;
}

export const FitnessGoalsCard: React.FC<FitnessGoalsCardProps> = ({ profileId }) => {
  const { data: goals, isLoading } = useQuery({
    queryKey: ['fitness-goals', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fitness_goals')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!profileId
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Цели фитнеса</CardTitle>
        <CardDescription>Установленные цели клиента</CardDescription>
      </CardHeader>
      <CardContent>
        {goals && goals.length > 0 ? (
          <div className="space-y-3">
            {goals.map((goal: any) => (
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
        ) : isLoading ? (
          <div className="space-y-2">
            <div className="h-16 bg-muted animate-pulse rounded-md" />
            <div className="h-16 bg-muted animate-pulse rounded-md" />
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Нет установленных целей</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
