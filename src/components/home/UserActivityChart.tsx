
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for the past week
const activityData = [
  { day: "Пн", users: 32, active: 28, meals: 124 },
  { day: "Вт", users: 35, active: 30, meals: 145 },
  { day: "Ср", users: 38, active: 29, meals: 132 },
  { day: "Чт", users: 40, active: 32, meals: 156 },
  { day: "Пт", users: 42, active: 36, meals: 178 },
  { day: "Сб", users: 35, active: 28, meals: 110 },
  { day: "Вс", users: 30, active: 24, meals: 98 },
];

const config = {
  users: {
    label: "Пользователи",
    theme: { light: "#3b82f6", dark: "#60a5fa" },
  },
  active: {
    label: "Активность",
    theme: { light: "#10b981", dark: "#34d399" },
  },
  meals: {
    label: "Приемы пищи",
    theme: { light: "#f59e0b", dark: "#fbbf24" },
  }
};

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
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-amber-400 mr-1"></span>
            Приемы пищи
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="var(--color-active)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="meals"
                  stroke="var(--color-meals)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
