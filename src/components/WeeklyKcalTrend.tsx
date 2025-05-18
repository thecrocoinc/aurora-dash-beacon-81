
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

type DataPoint = {
  day: string;
  value: number;
};

export function WeeklyKcalTrend() {
  const [data] = useState<DataPoint[]>([
    { day: "Mon", value: 1840 },
    { day: "Tue", value: 1920 },
    { day: "Wed", value: 1750 },
    { day: "Thu", value: 2100 },
    { day: "Fri", value: 1820 },
    { day: "Sat", value: 2050 },
    { day: "Sun", value: 1950 }
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
  const minValue = Math.min(...data.map(d => d.value));
  const maxValue = Math.max(...data.map(d => d.value));
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
  
  // Create SVG path from points
  const pathData = points.reduce((path, point, i) => {
    const command = i === 0 ? 'M' : 'L';
    return path + `${command}${point.x},${point.y} `;
  }, '');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Calorie Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[350px]">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
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
            
            {/* Y-axis labels */}
            <text x={padding.left - 5} y={padding.top} textAnchor="end" fontSize="3" fill="currentColor">
              {maxValue}
            </text>
            <text x={padding.left - 5} y={(chartHeight - padding.bottom + padding.top) / 2} textAnchor="end" fontSize="3" fill="currentColor">
              {Math.round((maxValue + minValue) / 2)}
            </text>
            <text x={padding.left - 5} y={chartHeight - padding.bottom} textAnchor="end" fontSize="3" fill="currentColor">
              {minValue}
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

            {/* Chart line */}
            <g transform={`translate(${padding.left}, ${padding.top})`}>
              <path
                d={pathData}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="1" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.2" />
                </linearGradient>
                
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area under the line */}
              <path
                d={`${pathData} L${points[points.length-1].x},${innerHeight} L${points[0].x},${innerHeight} Z`}
                fill="url(#areaGradient)"
              />
              
              {/* Data points */}
              {points.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="0.8"
                  fill="rgb(16, 185, 129)"
                  stroke="white"
                  strokeWidth="0.3"
                />
              ))}
            </g>
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-0 right-0 flex items-center gap-2 text-sm text-muted-foreground p-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>Average daily calories</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
