
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

type MacroData = {
  label: string;
  value: number;
  color: string;
};

interface RadarChartProps {
  data?: MacroData[];
  className?: string;
}

export function RadarChart({ 
  data = [
    { label: "Protein", value: 30, color: "#3B82F6" },
    { label: "Fat", value: 25, color: "#EF4444" },
    { label: "Carbs", value: 45, color: "#10B981" },
  ],
  className 
}: RadarChartProps) {
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

  const sides = data.length;
  const angleStep = (Math.PI * 2) / sides;
  const center = { x: 50, y: 50 };
  const radius = 30;
  
  // Generate points for each axis (the spokes of the web)
  const axisPoints = data.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2; // Start from top (subtract 90 degrees)
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
  });
  
  // Generate web rings (polygons at different distances from center)
  const rings = [0.2, 0.4, 0.6, 0.8, 1].map(scale => {
    return axisPoints.map(point => ({
      x: center.x + (point.x - center.x) * scale,
      y: center.y + (point.y - center.y) * scale,
    }));
  });
  
  // Generate data points scaled by their values
  const dataPoints = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const scaledRadius = radius * (d.value / 100) * animationProgress;
    return {
      x: center.x + scaledRadius * Math.cos(angle),
      y: center.y + scaledRadius * Math.sin(angle),
      ...d
    };
  });
  
  // Path for the data shape
  const dataPath = dataPoints.reduce((path, point, i) => {
    const command = i === 0 ? 'M' : 'L';
    return path + `${command}${point.x},${point.y} `;
  }, '') + 'Z'; // Close the path
  
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle>Macro Distribution</CardTitle>
        <CardDescription>Protein, fat, and carbohydrate ratio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 100 100">
              {/* Background rings */}
              {rings.map((points, ringIndex) => (
                <polygon
                  key={`ring-${ringIndex}`}
                  points={points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.1}
                  strokeWidth="0.5"
                />
              ))}
              
              {/* Axes */}
              {axisPoints.map((point, i) => (
                <line
                  key={`axis-${i}`}
                  x1={center.x}
                  y1={center.y}
                  x2={point.x}
                  y2={point.y}
                  stroke="currentColor"
                  strokeOpacity={0.2}
                  strokeWidth="0.5"
                />
              ))}
              
              {/* Data shape */}
              <path
                d={dataPath}
                fill="rgba(16, 185, 129, 0.2)"
                stroke="rgb(16, 185, 129)"
                strokeWidth="1.5"
              />
              
              {/* Data points */}
              {dataPoints.map((point, i) => (
                <circle
                  key={`point-${i}`}
                  cx={point.x}
                  cy={point.y}
                  r="2"
                  fill={point.color}
                />
              ))}
              
              {/* Labels */}
              {dataPoints.map((point, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const labelRadius = radius + 5;
                const x = center.x + labelRadius * Math.cos(angle);
                const y = center.y + labelRadius * Math.sin(angle);
                
                // Adjust text-anchor based on position around the circle
                const textAnchor = 
                  angle === -Math.PI / 2 ? "middle" : 
                  angle < 0 || angle > Math.PI ? "start" : "end";
                
                const dy = angle === -Math.PI / 2 ? "-0.5em" :
                           angle === Math.PI / 2 ? "1em" : "0.3em";
                
                return (
                  <text
                    key={`label-${i}`}
                    x={x}
                    y={y}
                    fontSize="4"
                    fill="currentColor"
                    textAnchor={textAnchor}
                    dy={dy}
                  >
                    {point.label} ({point.value}%)
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
