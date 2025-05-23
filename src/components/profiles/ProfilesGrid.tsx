
import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import DemoProfilesGrid from "./DemoProfilesGrid";
import { ProfileWithDetails } from "@/types/profile";

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
