
import React from "react";
import ProfileCard from "@/components/ProfileCard";
import { generateFakeProfiles } from "@/utils/fakeDemoProfiles";

/**
 * DemoProfilesGrid displays a grid of demo profiles when no real profiles are available
 */
const DemoProfilesGrid: React.FC = () => {
  // Generate 15 demo profiles
  const placeholderProfiles = generateFakeProfiles(15);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {placeholderProfiles.map((profile) => (
        <div key={profile.id} className="block h-full">
          <ProfileCard profile={profile} />
        </div>
      ))}
    </div>
  );
};

export default DemoProfilesGrid;
