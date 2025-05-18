
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, ArrowDown, Utensils, Clock } from "lucide-react";

// Unsplash food images for placeholders
const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1606914489794-d228b3325b19?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80"
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

// Random macros
const generateMacros = () => {
  const protein = Math.floor(Math.random() * 30) + 15;
  const carbs = Math.floor(Math.random() * 50) + 20;
  const fat = Math.floor(Math.random() * 20) + 10;
  
  return { protein, carbs, fat };
};

const MealTilePlaceholder = () => {
  // Generate random values
  const imageIndex = Math.floor(Math.random() * FOOD_IMAGES.length);
  const nameIndex = Math.floor(Math.random() * MEAL_NAMES.length);
  const grams = Math.floor(Math.random() * 101) + 150; // 150-250g
  const randomHour = Math.floor(Math.random() * 12) + 1;
  const randomMinute = Math.floor(Math.random() * 60);
  const amPm = Math.random() > 0.5 ? "am" : "pm";
  const formattedTime = `${randomHour}:${randomMinute.toString().padStart(2, '0')} ${amPm}`;

  const imageUrl = `${FOOD_IMAGES[imageIndex]}`;
  const mealName = MEAL_NAMES[nameIndex];
  const macros = generateMacros();
  const calories = Math.round(macros.protein * 4 + macros.carbs * 4 + macros.fat * 9);
  const goalAlignment = Math.random() > 0.5; // Random boolean for goal alignment
  const alignmentPercent = Math.floor(Math.random() * 15) + 5; // 5-20%

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
          <div className="relative h-40">
            <img
              src={imageUrl}
              alt="Healthy food"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-medium text-white">{mealName}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-white/70" />
                    <span className="text-xs text-white/90">{formattedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Utensils className="h-3 w-3 text-white/70" />
                    <span className="text-xs font-semibold text-white">{grams} g</span>
                  </div>
                </div>
              </div>

              {/* Calorie badge */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-white">
                {calories} kcal
              </div>

              {/* Goal alignment badge */}
              <div className={`absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium ${goalAlignment ? 'text-emerald-400' : 'text-amber-400'}`}>
                {goalAlignment ? (
                  <>
                    <ArrowUp className="h-3 w-3" />
                    <span>+{alignmentPercent}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-3 w-3" />
                    <span>-{alignmentPercent}%</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-2 p-1">
          <p className="font-medium">{mealName}</p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-blue-500/20 rounded p-1">
              <div className="font-medium">Белки</div>
              <div>{macros.protein}g</div>
            </div>
            <div className="bg-amber-500/20 rounded p-1">
              <div className="font-medium">Углеводы</div>
              <div>{macros.carbs}g</div>
            </div>
            <div className="bg-emerald-500/20 rounded p-1">
              <div className="font-medium">Жиры</div>
              <div>{macros.fat}g</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Фото блюда распознано ИИ</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default MealTilePlaceholder;
