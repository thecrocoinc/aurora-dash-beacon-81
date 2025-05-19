
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MasonryGrid from "@/components/MasonryGrid";
import MealGridSkeleton from "@/components/MealGridSkeleton";
import MealTilePlaceholder from "@/components/MealTilePlaceholder";

interface ProfileMealsCardProps {
  meals: any[];
  isLoading: boolean;
}

export const ProfileMealsCard: React.FC<ProfileMealsCardProps> = ({
  meals,
  isLoading
}) => {
  // Create placeholder meals for empty state
  const placeholderMeals = Array.from({ length: 6 }).map((_, i) => (
    <MealTilePlaceholder key={`placeholder-${i}`} />
  ));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Приемы пищи</CardTitle>
        <CardDescription>Записи о еде</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
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
  );
};
