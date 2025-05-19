
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  ArrowUp,
  ArrowDown, 
  Zap, 
  Watch, 
  TrendingUp 
} from "lucide-react";

interface ProfileWithDetails {
  id: string;
  name: string;
  avatar: string | null;
  watch_connected: boolean;
  kcalRatio: number;
  subscription_status?: 'active' | 'expired' | 'trial';
  streak_days?: number;
  goal_type?: string | null;
}

interface ProfilesStatsProps {
  profiles: ProfileWithDetails[];
}

export function ProfilesStats({ profiles }: ProfilesStatsProps) {
  // Calculate statistics
  const totalUsers = profiles.length;
  const activeSubscriptions = profiles.filter(p => p.subscription_status === 'active').length;
  const withConnectedWatch = profiles.filter(p => p.watch_connected).length;
  const watchConnectedPercentage = totalUsers > 0 ? Math.round((withConnectedWatch / totalUsers) * 100) : 0;
  
  // Calculate average kcal ratio
  const avgKcalRatio = profiles.length > 0 
    ? profiles.reduce((sum, profile) => sum + profile.kcalRatio, 0) / profiles.length 
    : 0;
  const avgKcalPercentage = Math.round(avgKcalRatio * 100);
  
  // Calculate trend (this would be better with historical data, but we'll simulate for now)
  const simulatedLastWeekRatio = avgKcalRatio * (0.9 + Math.random() * 0.2); // Random variation
  const trendDiff = Math.round((avgKcalRatio - simulatedLastWeekRatio) * 100);
  const isPositiveTrend = trendDiff > 0;
  
  const stats = [
    {
      label: "Всего клиентов",
      value: totalUsers,
      icon: <Users className="h-5 w-5 text-primary" />
    },
    {
      label: "Активные подписки",
      value: activeSubscriptions,
      suffix: totalUsers > 0 ? ` (${Math.round((activeSubscriptions / totalUsers) * 100)}%)` : "",
      icon: <Zap className="h-5 w-5 text-primary" />
    },
    {
      label: "Часы подключены",
      value: `${watchConnectedPercentage}%`,
      icon: <Watch className="h-5 w-5 text-primary" />
    },
    {
      label: "Средний прогресс",
      value: `${avgKcalPercentage}%`,
      trend: trendDiff,
      trendLabel: "от прошлой недели",
      icon: <TrendingUp className="h-5 w-5 text-primary" />
    }
  ];
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="stat-card border border-white/5 hover:border-white/10">
          <div className="flex items-center justify-between p-4 h-full">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}{stat.suffix || ''}</p>
              
              {stat.trend !== undefined && (
                <div className={`flex items-center text-xs ${isPositiveTrend ? 'text-emerald-500' : 'text-red-500'}`}>
                  {isPositiveTrend ? (
                    <>
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>+{Math.abs(stat.trend)}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="h-3 w-3 mr-1" />
                      <span>-{Math.abs(stat.trend)}%</span>
                    </>
                  )}
                  {stat.trendLabel && <span className="text-muted-foreground ml-1">{stat.trendLabel}</span>}
                </div>
              )}
            </div>
            
            <div className="rounded-full p-3 bg-primary/10">
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
