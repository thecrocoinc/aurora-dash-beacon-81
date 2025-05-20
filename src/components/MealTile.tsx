
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO, isValid } from "date-fns";
import { Utensils, Coffee, Apple, Egg, Pizza, Sandwich, Soup, Cake, LucideIcon } from "lucide-react";

type MealProps = {
  id: string;
  dish: string | null;
  grams: number | null;
  eaten_at: string | null;
  photo_id: string | null;
  kcal?: number | null;
  prot?: number | null;
  fat?: number | null;
  carb?: number | null;
};

type MealTileProps = {
  meal: MealProps;
};

// Icons for different meal types
const mealIcons: LucideIcon[] = [
  Utensils,
  Coffee, 
  Apple,
  Egg,
  Pizza,
  Sandwich,
  Soup,
  Cake
];

const MealTile = ({ meal }: MealTileProps) => {
  // Get a consistent icon based on the meal id
  const getMealIcon = () => {
    if (!meal.id) return <Utensils className="h-6 w-6" />;
    const index = Math.abs(meal.id.charCodeAt(0) % mealIcons.length);
    const IconComponent = mealIcons[index];
    return <IconComponent className="h-6 w-6" />;
  };
  
  // Get background color based on meal type
  const getBackgroundColor = () => {
    if (!meal.id) return "bg-blue-600";
    const charCode = meal.id.charCodeAt(0);
    
    if (charCode % 4 === 0) return "bg-blue-600";
    if (charCode % 4 === 1) return "bg-emerald-600";
    if (charCode % 4 === 2) return "bg-amber-600";
    return "bg-purple-600";
  };

  const formattedTime = meal.eaten_at && isValid(parseISO(meal.eaten_at))
    ? format(parseISO(meal.eaten_at), "h:mm a")
    : "Unknown time";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className={`${getBackgroundColor()} h-full p-4 flex items-center justify-center text-white`}>
                {getMealIcon()}
              </div>
              <div className="p-3 flex-1">
                <h3 className="font-medium">{meal.dish || "Unknown meal"}</h3>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formattedTime}</span>
                  <span className="font-semibold">{meal.kcal || 0} ккал</span>
                </div>
                {meal.grams && (
                  <span className="text-xs text-muted-foreground block mt-1">
                    Порция: {meal.grams}г
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p className="font-medium">{meal.dish || "Unknown meal"}</p>
          <p className="text-xs">Белки: {meal.prot || 0}г</p>
          <p className="text-xs">Углеводы: {meal.carb || 0}г</p>
          <p className="text-xs">Жиры: {meal.fat || 0}г</p>
          {meal.grams && <p className="text-xs">Вес порции: {meal.grams}г</p>}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default MealTile;
