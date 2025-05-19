
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";

type StatusType = "active" | "trial" | "pending" | string;

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch(status) {
    case 'active':
      return (
        <Badge variant="outline" className="border-0 bg-emerald-500/10 text-emerald-400 flex items-center gap-1.5 px-2 py-1">
          <CheckCircle className="h-3 w-3" />
          Активна
        </Badge>
      );
    case 'trial':
      return (
        <Badge variant="outline" className="border-0 bg-amber-500/10 text-amber-400 flex items-center gap-1.5 px-2 py-1">
          <Clock className="h-3 w-3" />
          Пробный период
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="border-0 bg-blue-500/10 text-blue-400 flex items-center gap-1.5 px-2 py-1">
          <AlertCircle className="h-3 w-3" />
          Ожидание
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="border-0 bg-muted text-muted-foreground px-2 py-1">
          {status}
        </Badge>
      );
  }
}
