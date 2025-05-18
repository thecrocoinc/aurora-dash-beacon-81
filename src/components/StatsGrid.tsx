
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface StatItem {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
}

export function StatsGrid() {
  const stats: StatItem[] = [
    { label: "Active clients", value: 42 },
    { label: "Avg. kcal tracked", value: 1780 },
    { label: "Conversion", value: 12.4, suffix: "%" },
    { label: "MRR", value: 1870, prefix: "$" }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <CountUpStat stat={stat} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CountUpStat({ stat }: { stat: StatItem }) {
  const [value, setValue] = useState(0);
  const target = typeof stat.value === 'number' ? stat.value : parseFloat(stat.value as string);
  
  useEffect(() => {
    if (isNaN(target)) return;
    
    // Start from 0 and count up
    setValue(0);
    
    const duration = 1500; // ms
    const steps = 30;
    const stepTime = duration / steps;
    const increment = target / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setValue(Math.min(increment * currentStep, target));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [target]);
  
  // Format the display value
  let displayValue: string;
  
  if (typeof stat.value === 'number') {
    // For numeric values
    if (Number.isInteger(stat.value)) {
      displayValue = Math.round(value).toString();
    } else {
      displayValue = value.toFixed(1);
    }
  } else {
    // For string values (already formatted)
    displayValue = stat.value as string;
  }
  
  return (
    <div>
      <p className="text-sm text-muted-foreground">{stat.label}</p>
      <p className="text-3xl font-bold mt-2">
        {stat.prefix}{displayValue}{stat.suffix}
      </p>
    </div>
  );
}
