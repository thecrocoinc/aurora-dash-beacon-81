
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import KcalRing from "@/components/KcalRing";
import MacroChips from "@/components/MacroChips";
import MasonryGrid from "@/components/MasonryGrid";
import MealGridSkeleton from "@/components/MealGridSkeleton";
import MealTilePlaceholder from "@/components/MealTilePlaceholder";

type OverviewTabProps = {
  summary: {
    kcal: number;
    prot: number;
    fat: number;
    carb: number;
  } | null;
  dailyGoal: number;
  meals: Array<{
    id: string;
    dish: string | null;
    grams: number | null;
    photo_id: string | null;
    eaten_at: string | null;
    kcal?: number | null;
    prot?: number | null;
    fat?: number | null;
    carb?: number | null;
  }> | null;
  mealsLoading: boolean;
};

const OverviewTab = ({ summary, dailyGoal, meals, mealsLoading }: OverviewTabProps) => {
  // Create placeholder meals for empty state
  const placeholderMeals = Array.from({ length: 6 }).map((_, i) => (
    <MealTilePlaceholder key={`placeholder-${i}`} />
  ));
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Питание за день</CardTitle>
          <CardDescription>Калории и нутриенты</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <KcalRing value={summary?.kcal || 0} target={dailyGoal} />
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
      
      <Card>
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
