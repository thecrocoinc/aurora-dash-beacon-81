
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MealGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={`left-${i}`} className="h-40 w-full rounded-md" />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={`right-${i}`} className="h-40 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default MealGridSkeleton;
