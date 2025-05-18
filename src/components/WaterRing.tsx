
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface WaterRingProps {
  current?: number;
  goal?: number;
  className?: string;
}

export function WaterRing({ 
  current = 1.3, 
  goal = 2.0,
  className 
}: WaterRingProps) {
  const [progress, setProgress] = useState(0);
  const ratio = Math.min(current / goal, 1);
  
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const animationProgress = Math.min(elapsed / duration, 1);
      
      setProgress(animationProgress * ratio);
      
      if (animationProgress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [ratio]);

  // Circle properties
  const size = 100;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  
  // Wave properties
  const waveHeight = 4;
  const waveWidth = 20;
  const waterLevel = size - (size * progress);
  
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle>Daily Hydration</CardTitle>
        <CardDescription>Water intake tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-4">
          <div className="relative w-48 h-48">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
              />
              
              {/* Progress circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#water-gradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${size/2} ${size/2})`}
              />
              
              {/* Clippath for the water wave */}
              <clipPath id="water-clip">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius - strokeWidth / 2}
                />
              </clipPath>
              
              {/* Water wave */}
              <rect
                x="0"
                y={waterLevel}
                width={size}
                height={size}
                fill="url(#water-gradient)"
                clipPath="url(#water-clip)"
                opacity="0.7"
              >
                <animate
                  attributeName="y"
                  from={waterLevel - waveHeight}
                  to={waterLevel + waveHeight}
                  dur="2s"
                  repeatCount="indefinite"
                  values={`${waterLevel - waveHeight}; ${waterLevel}; ${waterLevel + waveHeight}; ${waterLevel}; ${waterLevel - waveHeight}`}
                />
              </rect>
              
              {/* Water wave path */}
              <path
                d={`M0,${waterLevel} Q${waveWidth/2},${waterLevel - waveHeight} ${waveWidth},${waterLevel} T${waveWidth*2},${waterLevel} T${waveWidth*3},${waterLevel} T${waveWidth*4},${waterLevel} T${waveWidth*5},${waterLevel} V${size} H0 Z`}
                fill="url(#water-gradient)"
                clipPath="url(#water-clip)"
                opacity="0.3"
              >
                <animate
                  attributeName="d"
                  dur="3s"
                  repeatCount="indefinite"
                  values={`
                    M0,${waterLevel} Q${waveWidth/2},${waterLevel - waveHeight} ${waveWidth},${waterLevel} T${waveWidth*2},${waterLevel} T${waveWidth*3},${waterLevel} T${waveWidth*4},${waterLevel} T${waveWidth*5},${waterLevel} V${size} H0 Z;
                    M0,${waterLevel} Q${waveWidth/2},${waterLevel + waveHeight} ${waveWidth},${waterLevel} T${waveWidth*2},${waterLevel} T${waveWidth*3},${waterLevel} T${waveWidth*4},${waterLevel} T${waveWidth*5},${waterLevel} V${size} H0 Z;
                    M0,${waterLevel} Q${waveWidth/2},${waterLevel - waveHeight} ${waveWidth},${waterLevel} T${waveWidth*2},${waterLevel} T${waveWidth*3},${waterLevel} T${waveWidth*4},${waterLevel} T${waveWidth*5},${waterLevel} V${size} H0 Z
                  `}
                />
              </path>
              
              {/* Gradients */}
              <defs>
                <linearGradient id="water-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold">{current} L</div>
              <div className="text-sm text-muted-foreground">of {goal} L goal</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
