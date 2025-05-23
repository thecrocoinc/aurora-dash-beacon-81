
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getSubscriptionBadge, getGoalInfo } from "@/utils/profileUtils";
import { useNavigate } from "react-router-dom";

interface ProfileWithDetails {
  id: string;
  first_name?: string | null;
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

interface ProfileTableRowProps {
  profile: ProfileWithDetails;
}

/**
 * ProfileTableRow renders a single profile row in the profiles list table
 */
const ProfileTableRow = ({ profile }: ProfileTableRowProps) => {
  const navigate = useNavigate();
  const initials = profile.first_name
    ? profile.first_name.charAt(0).toUpperCase()
    : "?";
  
  const progressPercentage = Math.round(profile.kcalRatio * 100);
  
  // Determine subscription status for styling
  const isPremium = profile.subscription_status === 'active';
  const isTrial = profile.subscription_status === 'trial';
  
  // Get progress bar color based on subscription status
  const getProgressColor = () => {
    if (isPremium) return "rgb(139, 92, 246)"; // purple-500
    return "rgb(59, 130, 246)"; // blue-500
  };
  
  // Navigate to profile detail page using React Router
  const handleClick = () => {
    navigate(`/profiles/${profile.id}`);
  };
  
  return (
    <TableRow 
      key={profile.id} 
      className="cursor-pointer hover:bg-muted/50"
      onClick={handleClick}
    >
      <TableCell className="flex items-center gap-2">
        <Avatar className={`h-8 w-8 flex-shrink-0 ${isPremium ? 'ring-1 ring-purple-500/30' : 'ring-1 ring-blue-500/30'}`}>
          <AvatarImage src={profile.avatar || undefined} alt={profile.first_name || ""} />
          <AvatarFallback className={`
            ${isPremium ? 'bg-purple-500/10 text-purple-400' : 
            'bg-blue-500/10 text-blue-400'} text-xs`}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm truncate max-w-[140px]">{profile.first_name || "Пользователь"}</span>
      </TableCell>
      
      <TableCell>
        {getSubscriptionBadge(profile.subscription_status)}
      </TableCell>
      
      <TableCell>
        <div className="truncate max-w-[100px]">
          {getGoalInfo(profile.goal_type)}
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex flex-col items-end">
          <div className="text-xs mb-1 whitespace-nowrap">
            {profile.currentKcal} / {profile.dailyGoal} ккал
          </div>
          <div className="w-full flex items-center gap-2">
            <Progress 
              value={progressPercentage} 
              className="h-2 flex-1 bg-muted/50" 
              style={{ 
                "--progress-background": getProgressColor(),
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
};

export default ProfileTableRow;
