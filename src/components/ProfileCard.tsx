
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Watch } from "lucide-react";
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
    goal_type?: string | null;
    streak_days?: number;
    subscription_status?: 'active' | 'expired' | 'trial';
  };
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const kcalPercentage = Math.round((profile.kcalRatio || 0) * 100);

  const goalTypeMap: Record<string, string> = {
    "weight_loss": "Снижение веса",
    "weight_gain": "Набор массы",
    "maintenance": "Поддержание",
    "athlete": "Спорт",
  };

  const statusBgColors = {
    'active': 'bg-emerald-100 text-emerald-800',
    'expired': 'bg-red-100 text-red-800',
    'trial': 'bg-amber-100 text-amber-800',
  };

  return (
    <Card className="mb-4 hover:bg-accent/5 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage 
              src={profile.avatar ? `${profile.avatar}?w=80&h=80&fit=crop&crop=faces` : undefined} 
              alt={profile.name} 
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{profile.name}</div>
                {profile.goal_type && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {goalTypeMap[profile.goal_type] || profile.goal_type}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {profile.subscription_status && (
                  <Badge className={statusBgColors[profile.subscription_status]}>
                    {profile.subscription_status === 'active' ? 'Активна' : 
                    profile.subscription_status === 'trial' ? 'Пробная' : 'Истекла'}
                  </Badge>
                )}
                <Watch className={profile.watch_connected ? "text-emerald-500" : "text-zinc-400"} size={18} />
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <div className="text-sm text-muted-foreground">Дневной прогресс</div>
              <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${kcalPercentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {kcalPercentage}% от дневной нормы
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Б {profile.prot ?? "—"} г
              </span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                Ж {profile.fat ?? "—"} г
              </span>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                У {profile.carb ?? "—"} г
              </span>
              {profile.streak_days && (
                <span className="ml-auto text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {profile.streak_days} дней
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
