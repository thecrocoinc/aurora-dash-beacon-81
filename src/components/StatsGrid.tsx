
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BarChart2, Users, ArrowUp, ArrowDown, TrendingUp, DollarSign } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: number;
}

export function StatsGrid() {
  const stats: StatItem[] = [
    {
      label: "Пользователей",
      value: 8640,
      trend: 14,
      icon: <Users className="h-5 w-5 stroke-[var(--color-primary-0)]" />
    }, 
    {
      label: "Платящих",
      value: 3750,
      trend: 12,
      icon: <BarChart2 className="h-5 w-5 stroke-[var(--color-primary-0)]" />
    }, 
    {
      label: "Конверсия",
      value: 43.4,
      suffix: "%",
      trend: 5.2,
      icon: <TrendingUp className="h-5 w-5 stroke-[var(--color-primary-0)]" />
    }, 
    {
      label: "Доход ежемес.",
      value: 4680000,
      prefix: "₽",
      trend: 15.2,
      icon: <DollarSign className="h-5 w-5 stroke-[var(--color-primary-0)]" />
    }
  ];
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <Card key={stat.label} className="stat-card">
          <div className="stat-card-header">
            <p className="stat-card-title">{stat.label}</p>
            <div className="stat-card-icon">
              {stat.icon}
            </div>
          </div>
          <CountUpStat stat={stat} />
        </Card>
      ))}
    </div>
  );
}

function CountUpStat({
  stat
}: {
  stat: StatItem;
}) {
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
      if (stat.value > 10000) {
        displayValue = Math.round(value / 1000) + "K";
      } else {
        displayValue = Math.round(value).toLocaleString('ru-RU');
      }
    } else {
      displayValue = value.toFixed(1);
    }
  } else {
    // For string values (already formatted)
    displayValue = stat.value as string;
  }

  // Determine if trend is positive
  const isPositive = stat.trend && stat.trend > 0;
  const isNegative = stat.trend && stat.trend < 0;
  
  return (
    <div>
      <p className="stat-card-value">
        {stat.prefix}{displayValue}{stat.suffix}
      </p>
      
      {stat.trend && (
        <div className={`stat-card-trend ${isPositive ? 'stat-card-trend-positive' : ''} ${isNegative ? 'stat-card-trend-negative' : ''}`}>
          {isPositive && (
            <>
              <ArrowUp className="h-4 w-4" />
              <span className="text-xs font-medium">
                {Math.abs(stat.trend)}%
              </span>
            </>
          )}
          
          {isNegative && (
            <>
              <ArrowDown className="h-4 w-4" />
              <span className="text-xs font-medium">
                {Math.abs(stat.trend)}%
              </span>
            </>
          )}
          
          <span className="text-xs text-muted-foreground ml-0.5">от прошлой недели</span>
        </div>
      )}
    </div>
  );
}
