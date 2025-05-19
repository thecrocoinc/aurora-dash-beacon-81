
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import KcalRing from "@/components/KcalRing";
import MacroChips from "@/components/MacroChips";

interface DailyNutritionCardProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  target: number;
}

export const DailyNutritionCard: React.FC<DailyNutritionCardProps> = ({
  calories,
  protein,
  fat,
  carbs,
  target
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Дневная норма</CardTitle>
        <CardDescription>Прогресс по калориям</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <KcalRing value={calories} target={target} />
        <MacroChips 
          protein={protein} 
          fat={fat} 
          carbs={carbs}
          className="mt-4" 
        />
      </CardContent>
    </Card>
  );
};
