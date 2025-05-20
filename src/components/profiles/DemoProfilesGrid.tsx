
import React from "react";
import ProfileCard from "@/components/ProfileCard";
import { faker } from "@/utils/fakeDemoProfiles";

/**
 * Demo profiles grid for when no real profiles are available
 */
const DemoProfilesGrid = () => {
  // Generate demo data
  const fakeDemoProfiles = Array.from({ length: 8 }, (_, i) => ({
    id: `demo-${i + 1}`,
    name: faker.name.firstName(),
    avatar: null
  }));

  // Map demo data to the expected format with first_name instead of name
  const profilesWithDetails = fakeDemoProfiles.map((profile) => ({
    ...profile,
    first_name: profile.name || 'User', // Map name to first_name
    id: profile.id.toString(),
    kcalRatio: Math.random(),
    currentKcal: Math.floor(Math.random() * 1800) + 200,
    dailyGoal: 2000,
    prot: Math.floor(Math.random() * 120) + 30,
    fat: Math.floor(Math.random() * 80) + 20,
    carb: Math.floor(Math.random() * 200) + 100
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {profilesWithDetails.map((profile) => (
        <div key={profile.id}>
          <ProfileCard profile={profile} />
        </div>
      ))}
    </div>
  );
};

export default DemoProfilesGrid;
