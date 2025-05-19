
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Watch } from "lucide-react";

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
            <div className="flex justify-between">
              <div className="font-semibold">{profile.name}</div>
              <Watch className={profile.watch_connected ? "text-emerald-500" : "text-zinc-400"} size={18} />
            </div>
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
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                P {profile.prot ?? "—"} g
              </span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                F {profile.fat ?? "—"} g
              </span>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                C {profile.carb ?? "—"} g
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
