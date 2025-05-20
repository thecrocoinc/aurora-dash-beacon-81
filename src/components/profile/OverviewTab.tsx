
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Ruler, Weight, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import KcalRing from "@/components/KcalRing";
import MacroChips from "@/components/MacroChips";
import MasonryGrid from "@/components/MasonryGrid";
import MealGridSkeleton from "@/components/MealGridSkeleton";
import MealTilePlaceholder from "@/components/MealTilePlaceholder";
import { ProfileExtended } from "@/types/profile";

type OverviewTabProps = {
  profile: ProfileExtended;
  summary: {
    kcal: number;
    prot: number;
    fat: number;
    carb: number;
    summary_md?: string;
  } | null;
  dailyGoal: number;
  meals: Array<{
    id: string;
    dish: string | null;
    grams: number | null;
    photo_id?: string | null;
    eaten_at: string | null;
    kcal?: number | null;
    prot?: number | null;
    fat?: number | null;
    carb?: number | null;
  }> | null;
  mealsLoading: boolean;
};

const OverviewTab = ({ profile, summary, dailyGoal, meals, mealsLoading }: OverviewTabProps) => {
  // Create placeholder meals for empty state
  const placeholderMeals = Array.from({ length: 6 }).map((_, i) => (
    <MealTilePlaceholder key={`placeholder-${i}`} />
  ));
  
  // Calculate weight progress percentage if both values exist
  const weightProgressPercentage = 
    profile.weight && profile.target_weight && profile.target_weight !== profile.weight
      ? Math.min(100, Math.max(0, (profile.weight / profile.target_weight) * 100))
      : null;
  
  // Determine if weight target is to lose or gain weight
  const isWeightLoss = profile.weight && profile.target_weight ? profile.weight > profile.target_weight : false;
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Nutrition metrics card */}
      <Card>
        <CardHeader>
          <CardTitle>Питание за день</CardTitle>
          <CardDescription>Калории и нутриенты</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <KcalRing 
            value={(summary?.kcal || 0) / dailyGoal} 
            label={`${summary?.kcal || 0}/${dailyGoal}`} 
          />
          <div className="flex gap-8 mt-6">
            <div className="flex flex-col items-center">
              <div className="text-sm text-muted-foreground mb-1">Белки</div>
              <div className="text-xl font-semibold">{summary?.prot || 0} г</div>
              <div className="text-xs text-muted-foreground mt-1">25% от нормы</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm text-muted-foreground mb-1">Жиры</div>
              <div className="text-xl font-semibold">{summary?.fat || 0} г</div>
              <div className="text-xs text-muted-foreground mt-1">30% от нормы</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm text-muted-foreground mb-1">Углеводы</div>
              <div className="text-xl font-semibold">{summary?.carb || 0} г</div>
              <div className="text-xs text-muted-foreground mt-1">45% от нормы</div>
            </div>
          </div>
          <div className="w-full mt-6">
            <MacroChips 
              protein={summary?.prot} 
              fat={summary?.fat} 
              carbs={summary?.carb} 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Client metrics card */}
      <Card>
        <CardHeader>
          <CardTitle>Физические показатели</CardTitle>
          <CardDescription>Рост, вес и цель</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-md border-border/40">
              <Ruler className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Рост</div>
                <div className="text-xl font-semibold">{profile.height || '—'} {profile.height ? 'см' : ''}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-md border-border/40">
              <Weight className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Текущий вес</div>
                <div className="text-xl font-semibold">{profile.weight || '—'} {profile.weight ? 'кг' : ''}</div>
              </div>
            </div>
          </div>
          
          {profile.target_weight && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Целевой вес</span>
                </div>
                <span className="text-sm font-semibold">{profile.target_weight} кг</span>
              </div>
              
              {weightProgressPercentage !== null && (
                <div className="space-y-1">
                  <Progress 
                    value={weightProgressPercentage} 
                    className="h-2"
                    style={{
                      "--progress-background": isWeightLoss ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)",
                    } as React.CSSProperties}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Текущий: {profile.weight} кг</span>
                    <span>Цель: {profile.target_weight} кг</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Meals card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Приемы пищи</CardTitle>
          <CardDescription>Съеденные продукты</CardDescription>
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
  );
};

export default OverviewTab;
