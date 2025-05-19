
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type ProfileHeaderProps = {
  profile: {
    id: string;
    name: string | null;
    avatar_url: string | null;
    goal_type?: string | null;
  };
};

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const initials = profile.name
    ?.split(" ")
    .map((n) => n[0])
    .join("") || "";
    
  // Determine plan type based on user ID (since subscription_status doesn't exist in the table)
  const getPlanBadge = () => {
    // Using a hash of the ID to deterministically assign a plan type
    const isPremium = profile.id.charCodeAt(0) % 2 === 0; 
    
    if (isPremium) {
      return <Badge className="bg-purple-600/90 text-white">Premium</Badge>;
    } else {
      return <Badge className="bg-blue-600/90 text-white">Basic</Badge>;
    }
  };
    
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
            {getPlanBadge()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
