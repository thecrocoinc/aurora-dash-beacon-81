
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  Crown, 
  Watch,
  Utensils,
  Heart 
} from "lucide-react";

interface ProfileWithDetails {
  id: string;
  name: string;
  avatar: string | null;
  watch_connected: boolean;
  kcalRatio: number;
  subscription_status?: string;
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
      label: "Basic",
      value: totalUsers - activeSubscriptions,
      icon: <Utensils className="h-4 w-4" />,
      color: "blue",
      gradient: "from-blue-900/50 to-transparent"
    },
    {
      label: "Premium",
      value: activeSubscriptions,
      icon: <Heart className="h-4 w-4" />,
      color: "purple",
      gradient: "from-purple-900/50 to-transparent"
    },
    {
      label: "Часы",
      value: `${watchConnectedPercentage}%`,
      icon: <Watch className="h-4 w-4" />,
      color: "default",
      gradient: "from-primary/10 to-transparent"
    },
    {
      label: "Прогресс",
      value: `${avgKcalPercentage}%`,
      icon: <TrendingUp className="h-4 w-4" />,
      color: "default",
      gradient: "from-primary/10 to-transparent"
    }
  ];
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-0 hover:shadow-md transition-all overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr opacity-40 pointer-events-none" 
               style={{ backgroundImage: `linear-gradient(to right, ${stat.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' : stat.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'}, transparent)` }} />
          <div className="flex items-center h-14 px-4 relative z-10">
            <div className={`rounded-full p-1.5 ${
              stat.color === 'purple' ? 'bg-purple-600/10 text-purple-400' : 
              stat.color === 'blue' ? 'bg-blue-600/10 text-blue-400' : 
              'bg-primary/10'} mr-3`}
            >
              {stat.icon}
            </div>
            <div className="flex flex-col justify-center">
              <p className={`text-xs ${
                stat.color === 'purple' ? 'text-purple-400' : 
                stat.color === 'blue' ? 'text-blue-400' : 
                'text-muted-foreground'}`}
              >
                {stat.label}
              </p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
