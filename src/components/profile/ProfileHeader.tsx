
import React from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileHeaderProps {
  profile: any;
  profileLoading: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  profileLoading,
}) => {
  if (profileLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    );
  }

  const initials = profile?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("") || "";

  const age = profile?.birthdate ? 
    Math.floor((new Date().getTime() - new Date(profile.birthdate).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 
    null;

  const goalTypeMap: Record<string, string> = {
    'weight_loss': 'Снижение веса',
    'weight_gain': 'Набор массы',
    'maintenance': 'Поддержание веса',
    'athlete': 'Спортивные результаты',
  };

  const activityLevelMap: Record<string, string> = {
    'sedentary': 'Сидячий',
    'light': 'Лёгкая активность',
    'moderate': 'Умеренная активность',
    'active': 'Активный',
    'very_active': 'Очень активный',
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile?.avatar_url ? `${profile.avatar_url}?w=160&h=160&fit=crop&crop=faces` : undefined} alt={profile?.name} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{profile?.name}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.goal_type && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {goalTypeMap[profile.goal_type] || profile.goal_type}
              </Badge>
            )}
            {profile.gender && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                {profile.gender === 'male' ? 'Мужчина' : 'Женщина'}
              </Badge>
            )}
            {age && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                {age} лет
              </Badge>
            )}
            {profile.activity_level && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {activityLevelMap[profile.activity_level] || profile.activity_level}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select defaultValue={profile?.goal_type || "maintenance"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Тип цели" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weight_loss">Снижение веса</SelectItem>
            <SelectItem value="weight_gain">Набор массы</SelectItem>
            <SelectItem value="maintenance">Поддержание</SelectItem>
            <SelectItem value="athlete">Спортивные результаты</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
