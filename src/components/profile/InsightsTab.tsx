
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadarChart } from "@/components/RadarChart";
import { WaterRing } from "@/components/WaterRing";

const InsightsTab = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Баланс питания</CardTitle>
          <CardDescription>Анализ нутриентов</CardDescription>
        </CardHeader>
        <CardContent>
          <RadarChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Водный баланс</CardTitle>
          <CardDescription>Потребление воды</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <WaterRing />
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsTab;
