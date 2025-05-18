
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Unsplash food images for placeholders
const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  "https://images.unsplash.com/photo-1494390248081-4e521a5940db",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
  "https://images.unsplash.com/photo-1606914489794-d228b3325b19",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
];

// Sample meal names for placeholders
const MEAL_NAMES = [
  "Healthy Bowl",
  "Green Salad",
  "Protein Plate",
  "Balanced Meal",
  "Superfood Mix",
  "Fresh Fruits",
  "Nutrient Bowl",
  "Veggie Delight"
];

const MealTilePlaceholder = () => {
  // Generate random values
  const imageIndex = Math.floor(Math.random() * FOOD_IMAGES.length);
  const nameIndex = Math.floor(Math.random() * MEAL_NAMES.length);
  const grams = Math.floor(Math.random() * 101) + 150; // 150-250g
  const randomHour = Math.floor(Math.random() * 12) + 1;
  const randomMinute = Math.floor(Math.random() * 60);
  const amPm = Math.random() > 0.5 ? "am" : "pm";
  const formattedTime = `${randomHour}:${randomMinute.toString().padStart(2, '0')} ${amPm}`;

  const imageUrl = `${FOOD_IMAGES[imageIndex]}?w=400&h=300&fit=crop&q=80`;
  const mealName = MEAL_NAMES[nameIndex];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="overflow-hidden">
          <div className="relative h-40">
            <img
              src={imageUrl}
              alt="Healthy food"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <h3 className="font-medium text-white">{mealName}</h3>
              <div className="flex justify-between">
                <span className="text-sm text-white/90">{formattedTime}</span>
                <span className="text-sm font-semibold text-white">{grams} g</span>
              </div>
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p className="font-medium">{mealName}</p>
          <p className="text-xs">Weight: {grams}g</p>
          <p className="text-xs text-muted-foreground">Placeholder healthy meal</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default MealTilePlaceholder;
