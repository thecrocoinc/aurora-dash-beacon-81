
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Watch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
  
  // Get plan type based on subscription status
  const getPlanBadge = () => {
    if (!profile.subscription_status) return null;
    
    switch(profile.subscription_status) {
      case 'active':
        return <Badge className="absolute top-3 right-3 bg-purple-600/90 text-white text-xs">Premium</Badge>;
      case 'trial':
      case 'expired':
      default:
        return <Badge className="absolute top-3 right-3 bg-blue-600/90 text-white text-xs">Basic</Badge>;
    }
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 relative overflow-hidden group">
      {getPlanBadge()}
      
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
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-muted-foreground">Дневной прогресс</span>
                <span className="font-semibold text-foreground">{kcalPercentage}%</span>
              </div>
              <Progress value={kcalPercentage} className="h-1.5" />
            </div>
            
            <div className="mt-3 pt-2 border-t border-zinc-700/10">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Нутриенты</span>
                {profile.currentKcal && profile.dailyGoal && (
                  <span className="font-mono">{profile.currentKcal} / {profile.dailyGoal} ккал</span>
                )}
              </div>
              <div className="flex gap-2 text-xs">
                <span className="rounded-sm bg-blue-500/10 px-2 py-0.5 text-blue-400">Б {profile.prot || 0}</span>
                <span className="rounded-sm bg-amber-500/10 px-2 py-0.5 text-amber-400">Ж {profile.fat || 0}</span>
                <span className="rounded-sm bg-green-500/10 px-2 py-0.5 text-green-400">У {profile.carb || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
