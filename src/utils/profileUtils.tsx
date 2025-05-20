import { Badge } from "@/components/ui/badge";
import { Target, Utensils, TrendingDown, TrendingUp } from "lucide-react";
import * as React from "react";

/**
 * Returns a Badge component for the given subscription status
 */
export const getSubscriptionBadge = (status?: string) => {
  switch(status) {
    case 'active':
      return <Badge className="bg-gradient-to-r from-gray-600/10 to-gray-500/20 text-purple-400 border-0 font-medium">Premium</Badge>;
    case 'trial':
      return <Badge className="bg-gradient-to-r from-gray-600/10 to-gray-500/20 text-blue-400 border-0 font-medium">Trial</Badge>;
    default:
      return <Badge className="bg-gradient-to-r from-gray-600/10 to-gray-500/20 text-blue-400 border-0 font-medium">Basic</Badge>;
  }
};

/**
 * Returns goal information (icon and text) based on the goal type
 */
export const getGoalInfo = (goalType?: string | null) => {
  let Icon = Utensils;
  let text = "Не указана";
  
  switch(goalType) {
    case 'weight_loss':
      Icon = TrendingDown;
      text = "Снижение";
      break;
    case 'weight_gain':
      Icon = TrendingUp;
      text = "Набор";
      break;
    case 'maintenance':
      Icon = Target;
      text = "Поддержание";
      break;
  }
  
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-sm text-muted-foreground truncate">{text}</span>
    </div>
  );
};
