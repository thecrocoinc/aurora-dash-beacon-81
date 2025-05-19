import React from "react";
import { Link } from "react-router-dom";
import { EmptyBanner } from "@/components/EmptyBanner";
import { UserPlus, Watch, ArrowUp, ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface ProfileWithDetails {
  id: string;
  name: string;
  avatar: string | null;
  watch_connected: boolean;
  kcalRatio: number;
  currentKcal: number;
  dailyGoal: number;
  prot: number;
  fat: number;
  carb: number;
  goal_type?: string | null;
  created_at?: string | null;
  last_activity?: string | null;
  streak_days?: number;
  subscription_status?: 'active' | 'expired' | 'trial';
}

interface ProfilesListProps {
  profiles: ProfileWithDetails[] | undefined;
}

const ProfilesList = ({ profiles }: ProfilesListProps) => {
  if (!profiles || profiles.length === 0) {
    return (
      <EmptyBanner
        icon={UserPlus}
        title="Нет клиентов"
        subtitle="Подключите ваш Telegram-бот чтобы видеть живые данные"
      />
    );
  }

  // Helper functions
  const getSubscriptionBadge = (status?: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-purple-600 text-white">Premium</Badge>;
      case 'trial':
        return <Badge className="bg-blue-600 text-white">Trial</Badge>;
      case 'expired':
      default:
        return <Badge className="bg-zinc-500 text-white">Expired</Badge>;
    }
  };

  const getGoalBadge = (goalType?: string | null) => {
    switch(goalType) {
      case 'weight_loss':
        return <Badge variant="outline" className="bg-blue-100/10 border-blue-300/20 text-blue-400">Снижение веса</Badge>;
      case 'weight_gain':
        return <Badge variant="outline" className="bg-amber-100/10 border-amber-300/20 text-amber-400">Набор массы</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="bg-emerald-100/10 border-emerald-300/20 text-emerald-400">Поддержание</Badge>;
      default:
        return null;
    }
  };

  const getLastActivity = (lastActivity?: string) => {
    if (!lastActivity) return null;
    
    try {
      const lastActivityDate = parseISO(lastActivity);
      return formatDistanceToNow(lastActivityDate, { addSuffix: true, locale: ru });
    } catch (error) {
      return null;
    }
  };

  const getProgressIndicator = (ratio: number) => {
    const percentage = Math.round(ratio * 100);
    const color = percentage >= 90 ? 'text-orange-500' : 
                 percentage >= 70 ? 'text-emerald-500' : 
                 'text-blue-400';
    const Icon = percentage >= 70 ? ArrowUp : ArrowDown;
    
    return (
      <div className="flex items-center gap-1">
        <span className={color}>{percentage}%</span>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {profiles.map((profile) => {
        const initials = profile.name
          .split(" ")
          .map((n) => n[0])
          .join("");
        
        return (
          <Link key={profile.id} to={`/profiles/${profile.id}`} className="block">
            <Card className="w-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 flex-shrink-0 ring-2 ring-white/10 shadow-md">
                    <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
                    <AvatarFallback className="bg-purple-800/30 text-purple-200">{initials}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{profile.name}</div>
                      <div className="flex items-center gap-3">
                        {getSubscriptionBadge(profile.subscription_status)}
                        <Watch className={`${profile.watch_connected ? "text-emerald-500" : "text-zinc-400"}`} size={16} />
                      </div>
                    </div>
                    
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      {profile.last_activity && (
                        <span>Активность: {getLastActivity(profile.last_activity)}</span>
                      )}
                      {profile.streak_days !== undefined && (
                        <span className="flex items-center gap-1">
                          <span>•</span>
                          <span>Серия: {profile.streak_days} {profile.streak_days === 1 ? 'день' : 
                                profile.streak_days > 1 && profile.streak_days < 5 ? 'дня' : 'дней'}</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between mt-2 items-center">
                      <div className="flex items-center gap-2">
                        {getGoalBadge(profile.goal_type)}
                        <div className="w-32">
                          <Progress 
                            value={Math.round(profile.kcalRatio * 100)} 
                            className="h-1.5" 
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm">
                        <span>Цель: {profile.currentKcal}/{profile.dailyGoal} ккал</span>
                        {getProgressIndicator(profile.kcalRatio)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfilesList;
