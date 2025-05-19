
import React from "react";
import { Link } from "react-router-dom";
import { EmptyBanner } from "@/components/EmptyBanner";
import { UserPlus, Target, Utensils, Weight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        return <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Premium</Badge>;
      default:
        return <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Basic</Badge>;
    }
  };

  // Get goal icon and text
  const getGoalInfo = (goalType?: string | null) => {
    let Icon = Utensils;
    let text = "Не указана";
    
    switch(goalType) {
      case 'weight_loss':
        Icon = Weight;
        text = "Снижение";
        break;
      case 'weight_gain':
        Icon = Weight;
        text = "Набор";
        break;
      case 'maintenance':
        Icon = Target;
        text = "Поддержание";
        break;
    }
    
    return (
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{text}</span>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Клиент</TableHead>
            <TableHead>Тариф</TableHead>
            <TableHead>Цель</TableHead>
            <TableHead className="text-right">Прогресс</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => {
            const initials = profile.name
              .split(" ")
              .map((n) => n[0])
              .join("");
            
            const progressPercentage = Math.round(profile.kcalRatio * 100);
            
            return (
              <TableRow 
                key={profile.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => window.location.href = `/profiles/${profile.id}`}
              >
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 ring-1 ring-white/10">
                    <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
                    <AvatarFallback className="bg-primary/20 text-primary">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{profile.name}</span>
                </TableCell>
                
                <TableCell>
                  {getSubscriptionBadge(profile.subscription_status)}
                </TableCell>
                
                <TableCell>
                  {getGoalInfo(profile.goal_type)}
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col items-end">
                    <div className="text-sm mb-1">
                      {profile.currentKcal}/{profile.dailyGoal} ккал
                    </div>
                    <div className="w-full flex items-center gap-2">
                      <Progress 
                        value={progressPercentage} 
                        className="h-2.5 flex-1 bg-muted/50" 
                        style={{ 
                          "--progress-background": "rgb(16, 185, 129)",
                        } as React.CSSProperties}
                      />
                      <span className="text-xs text-muted-foreground w-8 text-right">
                        {progressPercentage}%
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfilesList;
