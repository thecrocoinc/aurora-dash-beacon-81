
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Watch } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MacroChips from "@/components/MacroChips";
import { Badge } from "@/components/ui/badge";

type ProfileCardProps = {
  profile: {
    id: string;
    name: string;
    avatar?: string | null;
    kcalRatio: number;
    currentKcal?: number;
    dailyGoal?: number;
    watch_connected?: boolean;
    prot?: number;
    fat?: number;
    carb?: number;
    subscription_status?: 'active' | 'expired' | 'trial';
  };
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const kcalPercentage = Math.round((profile.kcalRatio || 0) * 100);
  
  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (kcalPercentage < 30) return "bg-red-500";
    if (kcalPercentage < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  // Get subscription badge color
  const getSubscriptionBadge = () => {
    if (!profile.subscription_status) return null;
    
    switch(profile.subscription_status) {
      case 'active':
        return <Badge className="absolute top-3 right-3 bg-green-500/90 text-white text-xs">Активная</Badge>;
      case 'trial':
        return <Badge className="absolute top-3 right-3 bg-amber-500/90 text-white text-xs">Пробная</Badge>;
      case 'expired':
        return <Badge className="absolute top-3 right-3 bg-zinc-500/90 text-white text-xs">Истекла</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 relative overflow-hidden group">
      {getSubscriptionBadge()}
      
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="w-14 h-14 flex-shrink-0 ring-2 ring-white/10 shadow-md">
            <AvatarImage 
              src={profile.avatar || undefined}
              alt={profile.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-purple-800/30 text-purple-200">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <div className="font-medium text-base truncate tracking-tight">
                {profile.name}
              </div>
              <Watch 
                className={`${profile.watch_connected ? "text-emerald-500" : "text-zinc-400"} 
                           transition-all duration-200 group-hover:scale-110`} 
                size={16} 
              />
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-muted-foreground">Дневной прогресс</span>
                <span className="font-semibold text-foreground">{kcalPercentage}%</span>
              </div>
              <div className="h-1.5 bg-zinc-200/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor()} rounded-full transition-all duration-300`}
                  style={{ width: `${kcalPercentage}%` }}
                />
              </div>
            </div>
            
            <div className="mt-3 pt-2 border-t border-zinc-700/10">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Макронутриенты</span>
                {profile.currentKcal && profile.dailyGoal && (
                  <span className="font-mono">{profile.currentKcal} / {profile.dailyGoal} ккал</span>
                )}
              </div>
              <MacroChips 
                protein={profile.prot} 
                fat={profile.fat} 
                carbs={profile.carb}
                className="mt-1" 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
