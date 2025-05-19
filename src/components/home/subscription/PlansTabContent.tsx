
import React from "react";
import { BasicPlanCard } from "./BasicPlanCard";
import { PremiumPlanCard } from "./PremiumPlanCard";

export function PlansTabContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <BasicPlanCard />
      <PremiumPlanCard />
    </div>
  );
}
