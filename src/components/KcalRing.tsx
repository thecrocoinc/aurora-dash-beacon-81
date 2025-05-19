
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

  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (safePercentage < 30) return "#ef4444"; // red-500
    if (safePercentage < 70) return "#f59e0b"; // amber-500
    return "#10b981"; // emerald-500
  };

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke={getProgressColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 40}`}
          strokeDashoffset={`${2 * Math.PI * 40 * (1 - safePercentage / 100)}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold">{safeValue}</span>
        <span className="text-sm text-muted-foreground">/ {safeTarget} ккал</span>
      </div>
    </div>
  );
};

export default KcalRing;
