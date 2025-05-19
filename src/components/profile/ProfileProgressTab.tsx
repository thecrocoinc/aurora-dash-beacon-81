
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeightHistoryChart } from "@/components/WeightHistoryChart";
import { MeasurementsTable } from "@/components/MeasurementsTable";

interface ProfileProgressTabProps {
  profileId: string;
  targetWeight: number | null;
}

const ProfileProgressTab: React.FC<ProfileProgressTabProps> = ({ profileId, targetWeight }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>История изменения веса</CardTitle>
          <CardDescription>Динамика веса клиента</CardDescription>
        </CardHeader>
        <CardContent>
          <WeightHistoryChart profileId={profileId} targetWeight={targetWeight} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Измерения тела</CardTitle>
          <CardDescription>История измерений</CardDescription>
        </CardHeader>
        <CardContent>
          <MeasurementsTable profileId={profileId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileProgressTab;
