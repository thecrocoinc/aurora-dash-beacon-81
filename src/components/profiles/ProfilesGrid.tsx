
import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import DemoProfilesGrid from "./DemoProfilesGrid";

interface ProfileWithDetails {
  id: string;
  name: string;
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
  subscription_status?: 'active' | 'trial' | 'expired';
}

interface ProfilesGridProps {
  profiles: ProfileWithDetails[] | undefined;
}

/**
 * ProfilesGrid renders a grid of profile cards or demo profiles if none are available
 */
const ProfilesGrid = ({ profiles }: ProfilesGridProps) => {
  // If there are no profiles, display demo profiles
  if (!profiles || profiles.length === 0) {
    return <DemoProfilesGrid />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {profiles.map((profile) => (
        <Link 
          key={profile.id} 
          to={`/profiles/${profile.id}`} 
          className="block h-full"
        >
          <ProfileCard profile={profile} />
        </Link>
      ))}
    </div>
  );
};

export default ProfilesGrid;
