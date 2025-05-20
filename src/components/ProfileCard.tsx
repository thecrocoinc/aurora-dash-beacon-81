
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Target, Utensils, TrendingDown, TrendingUp } from "lucide-react";
import { PlanBadge } from "@/components/home/subscription/PlanBadge";
import { Link } from "react-router-dom";

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
  subscription_status?: string;
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
  
  // Determine if premium or basic
  const isPremium = profile.subscription_status === 'active';
  const isTrial = profile.subscription_status === 'trial';
  
  // Get goal icon
  const getGoalIcon = () => {
    switch(profile.goal_type) {
      case 'weight_loss':
        return <TrendingDown className={`h-3.5 w-3.5 ${isPremium ? 'text-purple-400' : 'text-blue-400'}`} />;
      case 'weight_gain':
        return <TrendingUp className={`h-3.5 w-3.5 ${isPremium ? 'text-purple-400' : 'text-blue-400'}`} />;
      case 'maintenance':
        return <Target className={`h-3.5 w-3.5 ${isPremium ? 'text-purple-400' : 'text-blue-400'}`} />;
      default:
        return <Utensils className={`h-3.5 w-3.5 ${isPremium ? 'text-purple-400' : 'text-blue-400'}`} />;
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
    <Card className={`h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
      ${isPremium ? 'border-purple-500/30 bg-gradient-to-tr from-purple-950/5 to-transparent' : 
      isTrial ? 'border-blue-500/30 bg-gradient-to-tr from-blue-950/5 to-transparent' : 
      'border-white/10'}`}
    >
      <CardContent className="p-3">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2">
              <Avatar className={`h-9 w-9 ${isPremium ? 'ring-1 ring-purple-500/30' : isTrial ? 'ring-1 ring-blue-500/30' : 'ring-1 ring-white/10'}`}>
                <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
                <AvatarFallback className={`
                  ${isPremium ? 'bg-purple-500/10 text-purple-400' : 
                  isTrial ? 'bg-blue-500/10 text-blue-400' : 
                  'bg-primary/20 text-primary'} text-xs`}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="overflow-hidden">
                <h3 className={`font-medium leading-none mb-1 text-sm truncate ${isPremium ? 'text-purple-50' : ''}`}>
                  {profile.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <PlanBadge plan={isPremium ? 'Premium' : 'Basic'} />
                  <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                    {getGoalIcon()} {getGoalText()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="text-muted-foreground">Прогресс:</span>
              <span className="whitespace-nowrap">{profile.currentKcal}/{profile.dailyGoal} ккал</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-muted/50" 
              style={{ 
                "--progress-background": isPremium ? "rgb(139, 92, 246)" : 
                                          isTrial ? "rgb(59, 130, 246)" : 
                                          "rgb(16, 185, 129)",
              } as React.CSSProperties}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
