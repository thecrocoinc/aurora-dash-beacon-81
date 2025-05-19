
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileNotesCardProps {
  notes: string | null;
}

export const ProfileNotesCard: React.FC<ProfileNotesCardProps> = ({ notes }) => {
  if (!notes) return null;
  
  return (
    <Card className="bg-zinc-900/80">
      <CardContent className="pt-4">
        <div className="text-zinc-300">
          <p className="italic">{notes}</p>
        </div>
      </CardContent>
    </Card>
  );
};
