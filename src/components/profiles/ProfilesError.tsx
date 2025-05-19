
import React from "react";
import { Card } from "@/components/ui/card";

interface ProfilesErrorProps {
  error: string | null;
}

const ProfilesError = ({ error }: ProfilesErrorProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
      <Card className="p-6">
        <div className="text-center text-red-500">
          <p>Произошла ошибка при загрузке данных:</p>
          <p className="font-mono text-sm">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-white rounded" 
            onClick={() => window.location.reload()}
          >
            Обновить страницу
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilesError;
