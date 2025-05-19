
import React from "react";
import { Badge } from "@/components/ui/badge";

interface PlanBadgeProps {
  plan: string;
}

export function PlanBadge({ plan }: PlanBadgeProps) {
  return (
    <Badge variant="outline" className={`border-0 px-2 py-0.5 ${
      plan === 'Premium' 
        ? 'bg-gradient-to-r from-emerald-600/10 to-emerald-500/20 text-emerald-400 font-medium' 
        : 'bg-gradient-to-r from-blue-600/10 to-blue-500/20 text-blue-400 font-medium'
    }`}>
      {plan}
    </Badge>
  );
}
