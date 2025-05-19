
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
};

export default ProfileLoading;
