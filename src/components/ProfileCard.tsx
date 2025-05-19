
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Watch } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MacroChips from "@/components/MacroChips";

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
    <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 flex-shrink-0">
            <Avatar className="w-full h-full">
              <AvatarImage 
                src={profile.avatar || undefined}
                alt={profile.name}
                className="object-cover"
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-base truncate">{profile.name}</div>
              <Watch className={profile.watch_connected ? "text-emerald-500" : "text-zinc-400"} size={16} />
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Дневной прогресс</span>
                <span className="font-medium">{kcalPercentage}%</span>
              </div>
              <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${kcalPercentage}%` }}
                />
              </div>
            </div>
            <MacroChips 
              protein={profile.prot} 
              fat={profile.fat} 
              carbs={profile.carb}
              className="mt-2" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
