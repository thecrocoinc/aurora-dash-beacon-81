
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSubscriptionBadge } from "@/utils/profileUtils";

type ProfileHeaderProps = {
  profile: {
    id: string;
    name: string | null;
    avatar_url: string | null;
    goal_type?: string | null;
    subscription_status?: string;
  };
};

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const initials = profile.name
    ?.split(" ")
    .map((n) => n[0])
    .join("") || "";
    
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 border-2 border-white/10">
          <AvatarImage 
            src={profile?.avatar_url} 
            alt={profile?.name} 
            className="object-cover"
          />
          <AvatarFallback className="text-2xl bg-purple-800/30 text-purple-200">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{profile?.name}</h1>
            {profile.subscription_status ? 
              getSubscriptionBadge(profile.subscription_status) : 
              getSubscriptionBadge('basic')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
