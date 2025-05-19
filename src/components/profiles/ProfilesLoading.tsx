
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface ProfilesLoadingProps {
  viewMode?: "grid" | "list";
}

const ProfilesLoading = ({ viewMode = "grid" }: ProfilesLoadingProps) => {
  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="w-full overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-40" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-3">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="h-full">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
              <div className="space-y-3 flex-1">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[70%]" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                
                <Skeleton className="h-5 w-24" />
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-1.5 w-full" />
                </div>
                
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfilesLoading;
