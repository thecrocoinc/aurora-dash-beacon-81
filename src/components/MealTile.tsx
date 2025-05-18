
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Meal } from "@/utils/dummy";

type MealTileProps = {
  meal: Meal;
};

const MealTile = ({ meal }: MealTileProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <img
          src={`${meal.image}?w=400&h=300&fit=crop`}
          alt={meal.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="font-medium text-white">{meal.name}</h3>
          <div className="flex justify-between">
            <span className="text-sm text-white/90">{meal.time}</span>
            <span className="text-sm font-semibold text-white">{meal.calories} kcal</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MealTile;
