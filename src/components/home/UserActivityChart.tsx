
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
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for different time periods
const activityData = {
  week: [
    { day: "Пн", users: 32, active: 28, meals: 124, premium: 18, basic: 14 },
    { day: "Вт", users: 35, active: 30, meals: 145, premium: 19, basic: 16 },
    { day: "Ср", users: 38, active: 29, meals: 132, premium: 21, basic: 17 },
    { day: "Чт", users: 40, active: 32, meals: 156, premium: 22, basic: 18 },
    { day: "Пт", users: 42, active: 36, meals: 178, premium: 24, basic: 18 },
    { day: "Сб", users: 35, active: 28, meals: 110, premium: 19, basic: 16 },
    { day: "Вс", users: 30, active: 24, meals: 98, premium: 17, basic: 13 },
  ],
  month: [
    { day: "1 Май", users: 28, active: 22, meals: 101, premium: 15, basic: 13 },
    { day: "8 Май", users: 32, active: 26, meals: 115, premium: 17, basic: 15 },
    { day: "15 Май", users: 38, active: 30, meals: 142, premium: 21, basic: 17 },
    { day: "22 Май", users: 41, active: 34, meals: 160, premium: 23, basic: 18 },
    { day: "29 Май", users: 45, active: 38, meals: 183, premium: 25, basic: 20 },
  ],
  quarter: [
    { day: "Март", users: 25, active: 20, meals: 420, premium: 14, basic: 11 },
    { day: "Апрель", users: 32, active: 26, meals: 520, premium: 18, basic: 14 },
    { day: "Май", users: 42, active: 35, meals: 680, premium: 24, basic: 18 },
  ],
  year: [
    { day: "Янв", users: 20, active: 15, meals: 350, premium: 11, basic: 9 },
    { day: "Фев", users: 22, active: 17, meals: 380, premium: 12, basic: 10 },
    { day: "Мар", users: 25, active: 20, meals: 420, premium: 14, basic: 11 },
    { day: "Апр", users: 32, active: 26, meals: 520, premium: 18, basic: 14 },
    { day: "Май", users: 42, active: 35, meals: 680, premium: 24, basic: 18 },
    { day: "Июн", users: 48, active: 40, meals: 750, premium: 28, basic: 20 },
  ],
};

// Configuration for chart lines
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
  },
  premium: {
    label: "Premium",
    theme: { light: "#8b5cf6", dark: "#a78bfa" },
  },
  basic: {
    label: "Basic",
    theme: { light: "#ec4899", dark: "#f472b6" },
  }
};

// Available metrics to display
const metrics = [
  { id: "all", label: "Все метрики" },
  { id: "users-active", label: "Пользователи и активность" },
  { id: "meals", label: "Приемы пищи" },
  { id: "subscriptions", label: "По подпискам" }
];

export function UserActivityChart() {
  // State for selected time period and metrics
  const [period, setPeriod] = useState("week");
  const [metric, setMetric] = useState("all");

  // Get current data based on selected period
  const currentData = activityData[period as keyof typeof activityData];
  
  // Determine which lines to show based on selected metric
  const showUsers = metric === "all" || metric === "users-active";
  const showActive = metric === "all" || metric === "users-active";
  const showMeals = metric === "all" || metric === "meals";
  const showPremium = metric === "all" || metric === "subscriptions";
  const showBasic = metric === "all" || metric === "subscriptions";

  return (
    <Card className="card-gradient overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
        <CardTitle className="text-xl">Активность пользователей</CardTitle>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Period selection */}
          <Tabs 
            value={period} 
            onValueChange={setPeriod}
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="week">Неделя</TabsTrigger>
              <TabsTrigger value="month">Месяц</TabsTrigger>
              <TabsTrigger value="quarter">Квартал</TabsTrigger>
              <TabsTrigger value="year">Год</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Metric selection */}
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите метрики" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        {/* Legend indicators */}
        <div className="flex flex-wrap items-center text-sm gap-4 mb-4">
          {showUsers && (
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-400 mr-1"></span>
              Пользователи
            </span>
          )}
          {showActive && (
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-emerald-400 mr-1"></span>
              Активность
            </span>
          )}
          {showMeals && (
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-amber-400 mr-1"></span>
              Приемы пищи
            </span>
          )}
          {showPremium && (
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-purple-400 mr-1"></span>
              Premium
            </span>
          )}
          {showBasic && (
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-pink-400 mr-1"></span>
              Basic
            </span>
          )}
        </div>
        
        <div className="h-[300px] w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="day"
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                
                {/* Conditionally render lines based on selected metric */}
                {showUsers && (
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-users)"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                )}
                {showActive && (
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="var(--color-active)"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                )}
                {showMeals && (
                  <Line
                    type="monotone"
                    dataKey="meals"
                    stroke="var(--color-meals)"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                )}
                {showPremium && (
                  <Line
                    type="monotone"
                    dataKey="premium"
                    stroke="var(--color-premium)"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                )}
                {showBasic && (
                  <Line
                    type="monotone"
                    dataKey="basic"
                    stroke="var(--color-basic)"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Data summary */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/20 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Всего пользователей</p>
            <p className="text-2xl font-medium">{
              period === "week" ? "42" : 
              period === "month" ? "45" : 
              period === "quarter" ? "42" : "48"
            }</p>
          </div>
          <div className="bg-muted/20 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Активных</p>
            <p className="text-2xl font-medium text-emerald-500">{
              period === "week" ? "36" : 
              period === "month" ? "38" : 
              period === "quarter" ? "35" : "40"
            }</p>
          </div>
          <div className="bg-muted/20 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Премиум</p>
            <p className="text-2xl font-medium text-purple-500">{
              period === "week" ? "24" : 
              period === "month" ? "25" : 
              period === "quarter" ? "24" : "28"
            }</p>
          </div>
          <div className="bg-muted/20 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Прирост пользователей</p>
            <p className="text-2xl font-medium text-blue-500">+{
              period === "week" ? "12%" : 
              period === "month" ? "18%" : 
              period === "quarter" ? "26%" : "32%"
            }</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
