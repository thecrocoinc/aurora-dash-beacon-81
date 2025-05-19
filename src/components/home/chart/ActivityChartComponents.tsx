
import React from "react";
import { PeriodType } from "./chartConfig";
import { getSummaryData } from "./activityData";

// Chart legend component
export const ChartLegend: React.FC = () => {
  return (
    <div className="flex items-center text-sm gap-4 mb-4">
      <span className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-[var(--color-surface-muted)] mr-2"></span>
        Всего пользователей
      </span>
      <span className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-[var(--color-primary-end)] mr-2"></span>
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
      <div className="bg-[var(--color-surface)] p-4 rounded-[var(--radius)] shadow border border-[var(--color-surface-muted)]">
        <p className="text-sm text-[var(--color-text-muted)] mb-1">Всего пользователей</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-medium">{summaryData.users}</p>
          <span className="ml-2 text-sm font-medium text-[var(--color-text-muted)]">{summaryData.growth}</span>
        </div>
      </div>
      <div className="bg-[var(--color-surface)] p-4 rounded-[var(--radius)] shadow border border-[rgba(206,159,73,0.2)]">
        <p className="text-sm text-[var(--color-text-muted)] mb-1">Активных пользователей</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-medium">{summaryData.active}</p>
          <span className="ml-2 text-sm font-medium text-[var(--color-primary-end)]">{summaryData.activeRate}</span>
        </div>
      </div>
    </div>
  );
};
