
import React from "react";
import { NotificationManager } from "@/components/home/NotificationManager";

export default function Notifications() {
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">Рассылки</h1>
      <p className="text-muted-foreground text-lg">
        Настройте и отправляйте уведомления вашим клиентам. Создавайте шаблоны, планируйте рассылки и отслеживайте их эффективность.
      </p>
      
      <div className="mt-8">
        <NotificationManager />
      </div>
    </section>
  );
}
