
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Target, Utensils, TrendingDown, TrendingUp, Dumbbell } from "lucide-react";
import { PlanBadge } from "@/components/home/subscription/PlanBadge";

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
  subscription_status?: 'active' | 'trial' | 'expired';
}

interface ProfileCardProps {
  profile: ProfileWithDetails;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Calculate progress percentage
  const progressPercentage = Math.round(profile.kcalRatio * 100);
  
  // Get subscription badge
  const getSubscriptionBadge = () => {
    switch(profile.subscription_status) {
      case 'active':
        return <PlanBadge plan="Premium" />;
      case 'trial':
      default:
        return <PlanBadge plan="Basic" />;
    }
  };
  
  // Get goal icon
  const getGoalIcon = () => {
    switch(profile.goal_type) {
      case 'weight_loss':
        return <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />;
      case 'weight_gain':
        return <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />;
      case 'maintenance':
        return <Target className="h-3.5 w-3.5 text-muted-foreground" />;
      default:
        return <Utensils className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };
  
  // Get goal text
  const getGoalText = () => {
    switch(profile.goal_type) {
      case 'weight_loss':
        return "Снижение";
      case 'weight_gain':
        return "Набор";
      case 'maintenance':
        return "Поддержание";
      default:
        return "Не указана";
    }
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-3">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2">
              <Avatar className="h-9 w-9 ring-1 ring-white/10">
                <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">{initials}</AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-medium leading-none mb-1 text-sm">{profile.name}</h3>
                <div className="flex items-center gap-1.5">
                  {getSubscriptionBadge()}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    {getGoalIcon()} {getGoalText()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="text-muted-foreground">Прогресс:</span>
              <span>{profile.currentKcal}/{profile.dailyGoal} ккал</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-muted/50" 
              style={{ 
                "--progress-background": "rgb(16, 185, 129)",
              } as React.CSSProperties}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
