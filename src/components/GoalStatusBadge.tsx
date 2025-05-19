
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GoalStatusBadgeProps {
  achieved: boolean;
  className?: string;
}

export const GoalStatusBadge: React.FC<GoalStatusBadgeProps> = ({ 
  achieved, 
  className 
}) => {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        achieved ? "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800" : "",
        className
      )}
    >
      {achieved ? "Достигнуто" : "В процессе"}
    </Badge>
  );
};
