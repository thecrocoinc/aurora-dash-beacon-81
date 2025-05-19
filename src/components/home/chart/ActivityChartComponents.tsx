
import React from "react";
import { PeriodType } from "./chartConfig";
import { getSummaryData } from "./activityData";

// Chart legend component
export const ChartLegend: React.FC = () => {
  return (
    <div className="flex items-center text-sm gap-4 mb-4">
      <span className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-health mr-2"></span>
        Всего пользователей
      </span>
      <span className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-sport mr-2"></span>
        Активные пользователи
      </span>
    </div>
  );
};

// Activity summary component
export const ActivitySummary: React.FC<{ period: PeriodType }> = ({ period }) => {
  const summaryData = getSummaryData(period);
  
  return (
    <div className="mt-6 grid grid-cols-2 gap-6">
      <div className="bg-card dark:bg-health/20 p-4 rounded-lg backdrop-blur-sm border border-health/10">
        <p className="text-sm text-muted-foreground mb-1">Всего пользователей</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-medium">{summaryData.users}</p>
          <span className="ml-2 text-sm font-medium text-health">{summaryData.growth}</span>
        </div>
      </div>
      <div className="bg-card dark:bg-sport-muted p-4 rounded-lg backdrop-blur-sm border border-sport/10">
        <p className="text-sm text-muted-foreground mb-1">Активных пользователей</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-medium">{summaryData.active}</p>
          <span className="ml-2 text-sm font-medium text-sport">{summaryData.activeRate}</span>
        </div>
      </div>
    </div>
  );
};
