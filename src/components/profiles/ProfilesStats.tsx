
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  Crown, 
  Watch
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
  
  const stats = [
    {
      label: "Клиенты",
      value: totalUsers,
      icon: <Users className="h-4 w-4" />
    },
    {
      label: "Premium",
      value: activeSubscriptions,
      icon: <Crown className="h-4 w-4" />
    },
    {
      label: "Часы",
      value: `${watchConnectedPercentage}%`,
      icon: <Watch className="h-4 w-4" />
    },
    {
      label: "Прогресс",
      value: `${avgKcalPercentage}%`,
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-0 hover:shadow-md transition-all">
          <div className="flex items-center h-14 px-4">
            <div className="rounded-full p-1.5 bg-primary/10 mr-3">
              {stat.icon}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
