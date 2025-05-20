
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import KcalRing from "@/components/KcalRing";
import MacroChips from "@/components/MacroChips";
import { getGoalInfo, getSubscriptionBadge } from "@/utils/profileUtils";

interface ProfileCardProps {
  profile: {
    id: string;
    first_name?: string | null;
    username?: string | null;
    avatar?: string | null;
    kcalRatio: number;
    currentKcal: number;
    dailyGoal: number;
    prot: number;
    fat: number;
    carb: number;
    goal_type?: string | null;
    subscription_status?: string;
  };
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  // Get first letter of first_name for avatar fallback
  const getInitial = () => {
    if (profile.first_name) {
      return profile.first_name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Avatar>
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.first_name || "User"} />
              ) : (
                <AvatarFallback>{getInitial()}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold line-clamp-1">
                {profile.first_name || "Пользователь"}
              </h3>
              {profile.username && (
                <p className="text-xs text-muted-foreground">
                  @{profile.username}
                </p>
              )}
              {getGoalInfo(profile.goal_type)}
            </div>
          </div>
          {getSubscriptionBadge(profile.subscription_status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-1">
          <KcalRing 
            value={profile.kcalRatio} 
            size="md"
            // Make sure KcalRing receives properties it expects
            label={`${profile.currentKcal}/${profile.dailyGoal}`}
          />
        </div>
        <MacroChips
          protein={profile.prot}
          fat={profile.fat}
          carbs={profile.carb}
          className="mt-2"
        />
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
