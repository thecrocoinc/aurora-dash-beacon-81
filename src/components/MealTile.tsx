
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO, isValid } from "date-fns";

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

// Unsplash fallback images for food
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
];

const MealTile = ({ meal }: MealTileProps) => {
  // Get a consistent fallback image based on the meal id
  const getFallbackImage = () => {
    if (!meal.id) return FALLBACK_IMAGES[0];
    const index = Math.abs(meal.id.charCodeAt(0) % FALLBACK_IMAGES.length);
    return FALLBACK_IMAGES[index];
  };

  const imageUrl = meal.photo_id 
    ? `${meal.photo_id}?w=400&h=300&fit=crop`
    : `${getFallbackImage()}?w=400&h=300&fit=crop`;
  
  const formattedTime = meal.eaten_at && isValid(parseISO(meal.eaten_at))
    ? format(parseISO(meal.eaten_at), "h:mm a")
    : "Unknown time";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="overflow-hidden">
          <div className="relative h-40">
            <img
              src={imageUrl}
              alt={meal.dish || "Food item"}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <h3 className="font-medium text-white">{meal.dish || "Unknown meal"}</h3>
              <div className="flex justify-between">
                <span className="text-sm text-white/90">{formattedTime}</span>
                <span className="text-sm font-semibold text-white">{meal.kcal || 0} kcal</span>
              </div>
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p className="font-medium">{meal.dish || "Unknown meal"}</p>
          <p className="text-xs">Protein: {meal.prot || 0}g</p>
          <p className="text-xs">Carbs: {meal.carb || 0}g</p>
          <p className="text-xs">Fat: {meal.fat || 0}g</p>
          {meal.grams && <p className="text-xs">Weight: {meal.grams}g</p>}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default MealTile;
