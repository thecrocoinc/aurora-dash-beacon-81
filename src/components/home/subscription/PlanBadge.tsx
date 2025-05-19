
import React from "react";
import { Badge } from "@/components/ui/badge";

interface PlanBadgeProps {
  plan: string;
}

export function PlanBadge({ plan }: PlanBadgeProps) {
  return (
    <Badge variant="outline" className={`border-0 ${
      plan === 'Premium' 
        ? 'bg-emerald-500/10 text-emerald-500' 
        : 'bg-primary/10 text-primary'
    }`}>
      {plan}
    </Badge>
  );
}
