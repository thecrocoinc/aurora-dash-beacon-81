
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BarChart2 } from "lucide-react";

export function ClientDataMetrics() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/80 to-purple-700/80">
          <Heart className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Данные клиентов</h2>
      </div>
      <p className="text-muted-foreground">Мониторинг данных о питании и активности ваших клиентов</p>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Метрики здоровья</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Средний пульс</span>
                <div className="flex items-center">
                  <span className="font-medium health-excellent">72</span>
                  <span className="text-xs text-muted-foreground ml-2">уд/мин</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Среднее КБЖУ</span>
                <div className="flex items-center">
                  <span className="font-medium health-good">1850</span>
                  <span className="text-xs text-muted-foreground ml-2">ккал</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Средняя активность</span>
                <div className="flex items-center">
                  <span className="font-medium health-average">6,200</span>
                  <span className="text-xs text-muted-foreground ml-2">шагов</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Средний сон</span>
                <div className="flex items-center">
                  <span className="font-medium health-poor">6.4</span>
                  <span className="text-xs text-muted-foreground ml-2">часов</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-emerald-400" />
              <span>Прогресс целей</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Снижение веса</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-emerald-500 h-full w-4/5 rounded-full"></div>
                </div>
                <span className="text-xs">80%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Баланс БЖУ</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-emerald-500 h-full w-3/4 rounded-full"></div>
                </div>
                <span className="text-xs">75%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Витамины</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-emerald-500 h-full w-5/6 rounded-full"></div>
                </div>
                <span className="text-xs">83%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Гидратация</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-blue-500 h-full w-2/3 rounded-full"></div>
                </div>
                <span className="text-xs">67%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
