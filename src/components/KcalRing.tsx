
import React from "react";

type KcalRingProps = {
  value: number;
  target: number;
};

const KcalRing = ({ value, target }: KcalRingProps) => {
  const percentage = Math.min((value / target) * 100, 100);
  const safeValue = isNaN(value) ? 0 : value;
  const safeTarget = isNaN(target) || target === 0 ? 2000 : target;
  const safePercentage = isNaN(percentage) ? 0 : percentage;

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="var(--color-surface-muted)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="var(--color-primary-0)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 40}`}
          strokeDashoffset={`${2 * Math.PI * 40 * (1 - safePercentage / 100)}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold stat-number">{safeValue}</span>
        <span className="text-sm text-muted-foreground">/ {safeTarget} kcal</span>
      </div>
    </div>
  );
};

export default KcalRing;
