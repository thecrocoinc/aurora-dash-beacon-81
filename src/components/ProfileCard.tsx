
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

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
        return <Badge className="bg-primary text-white">Premium</Badge>;
      default:
        return <Badge className="bg-muted text-foreground">Basic</Badge>;
    }
  };
  
  // Get goal type badge
  const getGoalBadge = () => {
    switch(profile.goal_type) {
      case 'weight_loss':
        return <Badge variant="outline" className="bg-blue-100/10 border-blue-300/20 text-blue-400">Снижение</Badge>;
      case 'weight_gain':
        return <Badge variant="outline" className="bg-amber-100/10 border-amber-300/20 text-amber-400">Набор</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="bg-emerald-100/10 border-emerald-300/20 text-emerald-400">Поддержание</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-white/10">
                <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
                <AvatarFallback className="bg-primary/20 text-primary">{initials}</AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-medium leading-none mb-1">{profile.name}</h3>
                <div className="flex gap-1">
                  {getSubscriptionBadge()}
                  {getGoalBadge()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="text-muted-foreground">Прогресс:</span>
              <span>{profile.currentKcal}/{profile.dailyGoal}</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-muted/50" 
              // Make progress bar green
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
