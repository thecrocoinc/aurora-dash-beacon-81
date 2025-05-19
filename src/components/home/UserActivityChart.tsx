
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeeklyKcalTrend } from "@/components/WeeklyKcalTrend";

export function UserActivityChart() {
  return (
    <Card className="card-gradient overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Активность пользователей</CardTitle>
        <div className="flex items-center text-sm space-x-4">
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-blue-400 mr-1"></span>
            Пользователи
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-emerald-400 mr-1"></span>
            Активность
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <WeeklyKcalTrend />
      </CardContent>
    </Card>
  );
}

