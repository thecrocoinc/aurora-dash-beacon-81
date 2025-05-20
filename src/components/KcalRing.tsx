
import React from "react";

type KcalRingProps = {
  value: number;
  size?: number | "sm" | "md" | "lg";
  showValue?: boolean;
  label?: string;
  target?: number;
};

const KcalRing = ({ value, size = "md", showValue, label, target }: KcalRingProps) => {
  const percentage = Math.min((value) * 100, 100);
  const safeValue = isNaN(value) ? 0 : value;
  const safePercentage = isNaN(percentage) ? 0 : percentage;

  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (safePercentage < 30) return "#ef4444"; // red-500
    if (safePercentage < 70) return "#f59e0b"; // amber-500
    return "#10b981"; // emerald-500
  };

  // Size configurations
  const getSizeConfig = () => {
    if (typeof size === "number") {
      return { 
        width: `w-[${size}px] h-[${size}px]`, 
        textSize: size > 60 ? "text-xl" : "text-sm", 
        subTextSize: "text-xs" 
      };
    }

    switch (size) {
      case "sm":
        return { width: "w-24 h-24", textSize: "text-xl", subTextSize: "text-xs" };
      case "lg":
        return { width: "w-64 h-64", textSize: "text-4xl", subTextSize: "text-lg" };
      case "md":
      default:
        return { width: "w-48 h-48", textSize: "text-3xl", subTextSize: "text-sm" };
    }
  };

  const { width, textSize, subTextSize } = getSizeConfig();

  return (
    <div className={`relative flex items-center justify-center ${width}`}>
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
        {label ? (
          <span className={`${textSize} font-bold`}>{label}</span>
        ) : (
          <>
            <span className={`${textSize} font-bold`}>{Math.round(safeValue * 100)}%</span>
            {!showValue && target && <span className={`${subTextSize} text-muted-foreground`}>/ {target}</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default KcalRing;
