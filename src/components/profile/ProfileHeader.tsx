
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const initials = profile.name
    ?.split(" ")
    .map((n) => n[0])
    .join("") || "";
    
  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate('/profiles')}
        className="mb-2"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Назад к списку
      </Button>
    
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
    </div>
  );
};

export default ProfileHeader;
