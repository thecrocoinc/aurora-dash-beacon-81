
import React from "react";
import { RadarChart } from "@/components/RadarChart";
import { WaterRing } from "@/components/WaterRing";

const ProfileNutritionTab: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RadarChart />
      <WaterRing />
    </div>
  );
};

export default ProfileNutritionTab;
