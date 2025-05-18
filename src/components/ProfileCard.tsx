
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/utils/dummy";

type ProfileCardProps = {
  profile: Profile;
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={`${profile.avatar}?w=80&h=80&fit=crop&crop=faces`} alt={profile.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">{profile.name}</div>
            <div className="mt-2 flex flex-col gap-1">
              <div className="text-sm text-muted-foreground">Daily progress</div>
              <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${profile.kcalRatio * 100}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round(profile.kcalRatio * 100)}% of daily goal
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
