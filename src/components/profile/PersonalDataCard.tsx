
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalDataCardProps {
  profile: any;
}

export const PersonalDataCard: React.FC<PersonalDataCardProps> = ({ profile }) => {
  const bmi = (profile.weight && profile.height) ? 
    (profile.weight / Math.pow(profile.height/100, 2)).toFixed(1) : 
    null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Персональные данные</CardTitle>
        <CardDescription>Основная информация о клиенте</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Рост</p>
            <p className="font-medium">{profile.height ? `${profile.height} см` : "Не указан"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Вес</p>
            <p className="font-medium">{profile.weight ? `${profile.weight} кг` : "Не указан"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Целевой вес</p>
            <p className="font-medium">{profile.target_weight ? `${profile.target_weight} кг` : "Не указан"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ИМТ</p>
            <p className="font-medium">{bmi ? `${bmi}` : "Не рассчитан"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">Диетические ограничения</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.dietary_restrictions && profile.dietary_restrictions.length > 0 ? (
                profile.dietary_restrictions.map((restriction: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                    {restriction}
                  </Badge>
                ))
              ) : (
                <p className="text-sm">Нет ограничений</p>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">Медицинские показания</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.medical_conditions && profile.medical_conditions.length > 0 ? (
                profile.medical_conditions.map((condition: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-amber-50 text-amber-700">
                    {condition}
                  </Badge>
                ))
              ) : (
                <p className="text-sm">Нет показаний</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
