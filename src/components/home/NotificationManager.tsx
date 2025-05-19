
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationManager() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500/80 to-amber-700/80">
          <Bell className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Управление уведомлениями</h2>
      </div>
      <p className="text-muted-foreground">Настройка уведомлений и рассылок для ваших клиентов</p>
      
      <div className="mt-4">
        <Card className="bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle>Запланированные рассылки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-background/40">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Новые рецепты недели</p>
                    <p className="text-xs text-muted-foreground">Запланировано на завтра, 9:00</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">32 получателя</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md bg-background/40">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-medium">Еженедельная сводка прогресса</p>
                    <p className="text-xs text-muted-foreground">Воскресенье, 18:00</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Всем</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">Создать рассылку</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
