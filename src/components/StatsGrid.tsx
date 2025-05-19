import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BarChart2, Users, ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
interface StatItem {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: number;
}
export function StatsGrid() {
  const stats: StatItem[] = [{
    label: "Active clients",
    value: 42,
    trend: 12,
    icon: <Users className="h-5 w-5 stroke-[var(--color-primary-0)]/70" />
  }, {
    label: "Avg. kcal tracked",
    value: 1780,
    trend: -5,
    icon: <BarChart2 className="h-5 w-5 stroke-[var(--color-primary-0)]/70" />
  }, {
    label: "Conversion",
    value: 12.4,
    suffix: "%",
    trend: 2.4,
    icon: <TrendingUp className="h-5 w-5 stroke-[var(--color-primary-0)]/70" />
  }, {
    label: "MRR",
    value: 1870,
    prefix: "$",
    trend: 15.2,
    icon: <BarChart2 className="h-5 w-5 stroke-[var(--color-primary-0)]/70" />
  }];
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => <Card key={stat.label} className="overflow-hidden bg-[var(--color-surface)] ring-1 ring-white/5 rounded-[12px] p-6">
          <CardContent className="p-6">
            <CountUpStat stat={stat} />
          </CardContent>
        </Card>)}
    </div>;
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
      displayValue = Math.round(value).toString();
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
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--color-text-muted)]">{stat.label}</p>
        {stat.icon}
      </div>
      <div>
        <p className="text-3xl font-bold">
          {stat.prefix}{displayValue}{stat.suffix}
        </p>
        
        {stat.trend && <div className="flex items-center gap-1 mt-1.5">
            {isPositive && <>
                <ArrowUp className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-500">
                  {Math.abs(stat.trend)}%
                </span>
              </>}
            {isNegative && <>
                <ArrowDown className="h-4 w-4 text-red-500" />
                <span className="text-xs font-medium text-red-500">
                  {Math.abs(stat.trend)}%
                </span>
              </>}
            <span className="text-xs text-muted-foreground ml-0.5">vs last week</span>
          </div>}
      </div>
    </div>;
}
