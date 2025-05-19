
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Watch, Clock, Flame, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

type ProfileCardProps = {
  profile: {
    id: string;
    name: string;
    avatar?: string | null;
    kcalRatio: number;
    currentKcal?: number;
    dailyGoal?: number;
    watch_connected?: boolean;
    subscription_status?: 'active' | 'expired' | 'trial';
    last_activity?: string;
    streak_days?: number;
    goal_type?: string | null;
  };
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const kcalPercentage = Math.round((profile.kcalRatio || 0) * 100);
  
  // Get plan type based on subscription status or ID
  const getPlanBadge = () => {
    if (!profile.subscription_status) {
      // Fallback using ID hash for consistency with ProfileDetail
      const isPremium = profile.id.charCodeAt(0) % 2 === 0;
      return (
        <Badge className={`absolute top-3 right-3 ${
          isPremium ? "bg-purple-600/90" : "bg-blue-600/90"
        } text-white text-xs`}>
          {isPremium ? "Premium" : "Basic"}
        </Badge>
      );
    }
    
    // If subscription_status exists, use it
    switch(profile.subscription_status) {
      case 'active':
        return <Badge className="absolute top-3 right-3 bg-purple-600/90 text-white text-xs">Premium</Badge>;
      case 'trial':
        return <Badge className="absolute top-3 right-3 bg-blue-600/90 text-white text-xs">Trial</Badge>;
      case 'expired':
      default:
        return <Badge className="absolute top-3 right-3 bg-zinc-500/90 text-white text-xs">Expired</Badge>;
    }
  };

  // Format the last activity date if available
  const getLastActivity = () => {
    if (!profile.last_activity) return null;
    
    try {
      const lastActivityDate = parseISO(profile.last_activity);
      return formatDistanceToNow(lastActivityDate, { addSuffix: true, locale: ru });
    } catch (error) {
      return null;
    }
  };

  // Determine the trend icon based on calorie ratio
  const getTrendIcon = () => {
    if (kcalPercentage >= 90) {
      return <Flame className="h-4 w-4 text-orange-500" />;
    } else if (kcalPercentage >= 70) {
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    } else {
      return <TrendingDown className="h-4 w-4 text-blue-400" />;
    }
  };

  // Get goal type display
  const getGoalTypeDisplay = () => {
    if (!profile.goal_type) return null;
    
    switch(profile.goal_type) {
      case 'weight_loss':
        return <Badge variant="outline" className="bg-blue-100/10 text-xs border-blue-300/20 text-blue-400">Снижение веса</Badge>;
      case 'weight_gain':
        return <Badge variant="outline" className="bg-amber-100/10 text-xs border-amber-300/20 text-amber-400">Набор массы</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="bg-emerald-100/10 text-xs border-emerald-300/20 text-emerald-400">Поддержание</Badge>;
      default:
        return null;
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
            
            {profile.goal_type && (
              <div className="mt-1">
                {getGoalTypeDisplay()}
              </div>
            )}
            
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>Прогресс</span>
                  {getTrendIcon()}
                </div>
                <span className="font-semibold text-foreground">{kcalPercentage}%</span>
              </div>
              <Progress 
                value={kcalPercentage} 
                className="h-1.5" 
                // Add a color gradient based on the percentage
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  '--progress-color': kcalPercentage >= 90 ? 'rgba(249,115,22,0.9)' : 
                                     kcalPercentage >= 70 ? 'rgba(16,185,129,0.9)' : 
                                     'rgba(59,130,246,0.9)',
                  '--tw-gradient-stops': kcalPercentage >= 90 ? 'var(--tw-gradient-from), var(--tw-gradient-to)' : 
                                         'var(--tw-gradient-from), var(--tw-gradient-to)'
                } as React.CSSProperties}
              />
            </div>
            
            {/* Activity indicators */}
            {(profile.last_activity || profile.streak_days !== undefined) && (
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                {profile.last_activity && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{getLastActivity()}</span>
                  </div>
                )}
                
                {profile.streak_days !== undefined && (
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    <span>{profile.streak_days} {profile.streak_days === 1 ? 'день' : 
                          profile.streak_days > 1 && profile.streak_days < 5 ? 'дня' : 'дней'}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
