
import { useEffect, useState } from "react";

type DataPoint = {
  day: string;
  value: number;
  target?: number;
};

export function WeeklyKcalTrend() {
  const [data] = useState<DataPoint[]>([
    { day: "Mon", value: 1840, target: 2000 },
    { day: "Tue", value: 1920, target: 2000 },
    { day: "Wed", value: 1750, target: 2000 },
    { day: "Thu", value: 2100, target: 2000 },
    { day: "Fri", value: 1820, target: 2000 },
    { day: "Sat", value: 2050, target: 2000 },
    { day: "Sun", value: 1950, target: 2000 }
  ]);
  
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Find min and max for scaling
  const minValue = Math.min(...data.map(d => d.value)) * 0.9;
  const maxValue = Math.max(...data.map(d => d.value || 0), ...data.map(d => d.target || 0)) * 1.1;
  const range = maxValue - minValue;
  
  // Chart dimensions
  const chartWidth = 100;
  const chartHeight = 50;
  const padding = { top: 10, right: 10, bottom: 20, left: 40 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Calculate point positions
  const points = data.map((d, i) => {
    const x = (innerWidth / (data.length - 1)) * i;
    // Scale value to chart height (with 10% padding at top and bottom)
    const normalizedValue = (d.value - minValue) / (range || 1);
    const y = innerHeight - (normalizedValue * innerHeight * animationProgress);
    return { x, y, ...d };
  });

  // Create target line points
  const targetPoints = data.map((d, i) => {
    const x = (innerWidth / (data.length - 1)) * i;
    // Scale value to chart height
    const normalizedTarget = ((d.target || 0) - minValue) / (range || 1);
    const y = innerHeight - (normalizedTarget * innerHeight * animationProgress);
    return { x, y, target: d.target };
  });
  
  // Create SVG path from points
  const pathData = points.reduce((path, point, i) => {
    const command = i === 0 ? 'M' : 'L';
    return path + `${command}${point.x},${point.y} `;
  }, '');

  // Create target line path
  const targetPathData = targetPoints.reduce((path, point, i) => {
    const command = i === 0 ? 'M' : 'L';
    return path + `${command}${point.x},${point.y} `;
  }, '');

  return (
    <div className="relative h-[350px]">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
        {/* Target Zone */}
        <rect
          x={padding.left}
          y={padding.top}
          width={innerWidth}
          height={innerHeight}
          fill="url(#targetZoneGradient)"
          opacity="0.05"
        />
        
        {/* Y-axis */}
        <line 
          x1={padding.left} 
          y1={padding.top} 
          x2={padding.left} 
          y2={chartHeight - padding.bottom} 
          stroke="currentColor" 
          strokeOpacity="0.2" 
        />
        
        {/* X-axis */}
        <line 
          x1={padding.left} 
          y1={chartHeight - padding.bottom} 
          x2={chartWidth - padding.right} 
          y2={chartHeight - padding.bottom} 
          stroke="currentColor" 
          strokeOpacity="0.2" 
        />
        
        {/* Y-axis grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
          <line
            key={`grid-${ratio}`}
            x1={padding.left}
            y1={padding.top + (innerHeight * (1 - ratio))}
            x2={chartWidth - padding.right}
            y2={padding.top + (innerHeight * (1 - ratio))}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* Y-axis labels */}
        <text x={padding.left - 5} y={padding.top} textAnchor="end" fontSize="3" fill="currentColor">
          {Math.round(maxValue)}
        </text>
        <text x={padding.left - 5} y={(chartHeight - padding.bottom + padding.top) / 2} textAnchor="end" fontSize="3" fill="currentColor">
          {Math.round((maxValue + minValue) / 2)}
        </text>
        <text x={padding.left - 5} y={chartHeight - padding.bottom} textAnchor="end" fontSize="3" fill="currentColor">
          {Math.round(minValue)}
        </text>
        
        {/* X-axis labels (days) */}
        {points.map((point, i) => (
          <text 
            key={`day-${i}`}
            x={padding.left + point.x}
            y={chartHeight - padding.bottom + 5}
            textAnchor="middle"
            fontSize="3"
            fill="currentColor"
          >
            {point.day}
          </text>
        ))}

        {/* Target line */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <path
            d={targetPathData}
            fill="none"
            stroke="#ff9500"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1,1"
            opacity="0.7"
          />
        </g>

        {/* Chart line */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <path
            d={pathData}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
            </linearGradient>
            
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            </linearGradient>
            
            <linearGradient id="targetZoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff9500" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ff9500" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area under the line */}
          <path
            d={`${pathData} L${points[points.length-1].x},${innerHeight} L${points[0].x},${innerHeight} Z`}
            fill="url(#areaGradient)"
          />
          
          {/* Data points */}
          {points.map((point, i) => {
            // Check if this point is within target range (for color coding)
            const inTarget = point.value >= (point.target || 0) * 0.9 && point.value <= (point.target || 0) * 1.1;
            
            return (
              <g key={i}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="1.2"
                  fill={inTarget ? "rgb(59, 130, 246)" : "#ff9500"}
                  className="animate-pulse-glow"
                  stroke="white"
                  strokeWidth="0.3"
                />
                <text
                  x={point.x}
                  y={point.y - 2}
                  fontSize="2.5"
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {point.value}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-0 right-0 flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground p-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Калории</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span>Целевой диапазон</span>
        </div>
      </div>
    </div>
  );
}
