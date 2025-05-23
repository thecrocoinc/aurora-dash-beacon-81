
import React from "react";
import { PeriodType } from "./chartConfig";
import { getSummaryData } from "./activityData";

// Chart legend component
export const ChartLegend: React.FC = () => {
  return (
    <div className="flex items-center text-sm gap-4 mb-4">
      <span className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-primary mr-2"></span>
        Скоро заплатят
      </span>
      <span className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-emerald-600 mr-2"></span>
        Платящие клиенты
      </span>
    </div>
  );
};

// Activity summary component
export const ActivitySummary: React.FC<{ period: PeriodType }> = ({ period }) => {
  const summaryData = getSummaryData(period);
  
  return (
    <div className="mt-6 grid grid-cols-2 gap-6">
      <div className="bg-[var(--color-surface)] p-4 rounded-[var(--radius)] shadow border border-primary/10">
        <p className="text-sm text-[var(--color-text-muted)] mb-1">Скоро заплатят</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-medium">{summaryData.users}</p>
          <span className="ml-2 text-sm font-medium text-primary">{summaryData.growth}</span>
        </div>
      </div>
      <div className="bg-[var(--color-surface)] p-4 rounded-[var(--radius)] shadow border border-emerald-600/20">
        <p className="text-sm text-[var(--color-text-muted)] mb-1">Платящие клиенты</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-medium">{summaryData.active}</p>
          <span className="ml-2 text-sm font-medium text-emerald-600">{summaryData.activeRate}</span>
        </div>
      </div>
    </div>
  );
};
