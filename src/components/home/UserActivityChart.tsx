
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

// Import refactored modules
import { activityData } from "./chart/activityData";
import { chartConfig, periodOptions, periodLabels, PeriodType } from "./chart/chartConfig";
import { ChartLegend, ActivitySummary } from "./chart/ActivityChartComponents";

export function UserActivityChart() {
  // State for selected time period
  const [period, setPeriod] = useState<PeriodType>("week");

  // Get current data based on selected period
  const currentData = activityData[period];
  
  return (
    <Card className="overflow-hidden bg-card dark:bg-card/5 backdrop-blur-sm border dark:border-amber-500/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Активность пользователей</CardTitle>
        
        {/* Period selection */}
        <Tabs 
          value={period} 
          onValueChange={(value) => setPeriod(value as PeriodType)}
        >
          <TabsList>
            {periodOptions.map((periodKey) => (
              <TabsTrigger key={periodKey} value={periodKey}>
                {periodLabels[periodKey as PeriodType]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="pb-6">
        {/* Legend indicators */}
        <ChartLegend />
        
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
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
        
        {/* Data summary */}
        <ActivitySummary period={period} />
      </CardContent>
    </Card>
  );
}
