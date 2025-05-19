
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle } from "lucide-react";

type StatusType = "active" | "trial" | "pending" | string;

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch(status) {
    case 'active':
      return (
        <Badge variant="outline" className="border-0 bg-emerald-500/20 text-emerald-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Активна
        </Badge>
      );
    case 'trial':
      return (
        <Badge variant="outline" className="border-0 bg-amber-500/20 text-amber-500 flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          Пробный период
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="border-0 bg-blue-500/20 text-blue-500 flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3" />
          Ожидание
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="border-0 bg-muted text-muted-foreground">
          {status}
        </Badge>
      );
  }
}
