
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simplified data for different time periods
const activityData = {
  week: [
    { day: "Пн", users: 32, active: 28 },
    { day: "Вт", users: 35, active: 30 },
    { day: "Ср", users: 38, active: 29 },
    { day: "Чт", users: 40, active: 32 },
    { day: "Пт", users: 42, active: 36 },
    { day: "Сб", users: 35, active: 28 },
    { day: "Вс", users: 30, active: 24 },
  ],
  month: [
    { day: "1 Май", users: 28, active: 22 },
    { day: "8 Май", users: 32, active: 26 },
    { day: "15 Май", users: 38, active: 30 },
    { day: "22 Май", users: 41, active: 34 },
    { day: "29 Май", users: 45, active: 38 },
  ],
  quarter: [
    { day: "Март", users: 25, active: 20 },
    { day: "Апрель", users: 32, active: 26 },
    { day: "Май", users: 42, active: 35 },
  ],
  year: [
    { day: "Янв", users: 20, active: 15 },
    { day: "Фев", users: 22, active: 17 },
    { day: "Мар", users: 25, active: 20 },
    { day: "Апр", users: 32, active: 26 },
    { day: "Май", users: 42, active: 35 },
    { day: "Июн", users: 48, active: 40 },
  ],
};

// Configuration for chart lines (simplified)
const config = {
  users: {
    label: "Пользователи",
    theme: { light: "#3b82f6", dark: "#60a5fa" },
  },
  active: {
    label: "Активные пользователи",
    theme: { light: "#10b981", dark: "#34d399" },
  }
};

export function UserActivityChart() {
  // State for selected time period
  const [period, setPeriod] = useState("week");

  // Get current data based on selected period
  const currentData = activityData[period as keyof typeof activityData];
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Активность пользователей</CardTitle>
        
        {/* Period selection */}
        <Tabs 
          value={period} 
          onValueChange={setPeriod}
        >
          <TabsList>
            <TabsTrigger value="week">Неделя</TabsTrigger>
            <TabsTrigger value="month">Месяц</TabsTrigger>
            <TabsTrigger value="quarter">Квартал</TabsTrigger>
            <TabsTrigger value="year">Год</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="pb-6">
        {/* Legend indicators */}
        <div className="flex items-center text-sm gap-4 mb-4">
          <span className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
            Всего пользователей
          </span>
          <span className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
            Активные пользователи
          </span>
        </div>
        
        <div className="h-[300px] w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={currentData} 
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="day"
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tick={{ fontSize: 12 }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(value) => `${value}`}
                  tick={{ fontSize: 12 }}
                  width={30}
                />
                <Tooltip content={<ChartTooltipContent />} />
                
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={2.5}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="var(--color-active)"
                  strokeWidth={2.5}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Simplified data summary */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Всего пользователей</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-medium">{
                period === "week" ? "42" : 
                period === "month" ? "45" : 
                period === "quarter" ? "42" : "48"
              }</p>
              <span className="ml-2 text-sm font-medium text-green-500">+{
                period === "week" ? "12%" : 
                period === "month" ? "18%" : 
                period === "quarter" ? "26%" : "32%"
              }</span>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Активных пользователей</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-medium">{
                period === "week" ? "36" : 
                period === "month" ? "38" : 
                period === "quarter" ? "35" : "40"
              }</p>
              <span className="ml-2 text-sm font-medium text-green-500">{
                period === "week" ? "85%" : 
                period === "month" ? "84%" : 
                period === "quarter" ? "83%" : "83%"
              }</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
