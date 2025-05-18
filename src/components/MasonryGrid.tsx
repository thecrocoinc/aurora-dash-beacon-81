
import React from "react";
import { cn } from "@/lib/utils";
import MealTile from "./MealTile";

type MasonryGridProps = {
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
  }>;
  className?: string;
};

const MasonryGrid = ({ meals, className }: MasonryGridProps) => {
  // Split meals into two columns for a basic masonry layout
  const leftColumnMeals = meals.filter((_, i) => i % 2 === 0);
  const rightColumnMeals = meals.filter((_, i) => i % 2 !== 0);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      <div className="space-y-4">
        {leftColumnMeals.map((meal) => (
          <MealTile key={meal.id} meal={meal} />
        ))}
      </div>
      <div className="space-y-4">
        {rightColumnMeals.map((meal) => (
          <MealTile key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;
