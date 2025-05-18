
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Profile } from "@/utils/dummy";

type ProfileCardProps = {
  profile: {
    id: string;
    name: string;
    avatar?: string | null;
    kcalRatio: number;
    currentKcal?: number;
    dailyGoal?: number;
  };
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const kcalPercentage = Math.round((profile.kcalRatio || 0) * 100);

  return (
    <Card className="mb-4">
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
            <div className="font-semibold">{profile.name}</div>
            <div className="mt-2 flex flex-col gap-1">
              <div className="text-sm text-muted-foreground">Daily progress</div>
              <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${kcalPercentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {kcalPercentage}% of daily goal
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
