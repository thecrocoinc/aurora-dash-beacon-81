
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Bot } from "lucide-react";

export function SubscriptionManagement() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/80 to-blue-700/80">
          <Database className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Управление подписками</h2>
      </div>
      <p className="text-muted-foreground">Мониторинг активности подписок клиентов и настройка тарифов</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <Card className="bg-card/70 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-blue-500/20 mb-3">
              <Bot className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-medium mb-1">Базовый</h3>
            <p className="text-sm text-muted-foreground mb-3">Трекинг питания</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-blue-500 h-full w-1/2 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">15 активных пользователей</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 backdrop-blur border-primary/30">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-emerald-500/20 mb-3">
              <Bot className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-medium mb-1">Premium</h3>
            <p className="text-sm text-muted-foreground mb-3">Трекинг + AI советы</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-emerald-500 h-full w-3/4 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">12 активных пользователей</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-amber-500/20 mb-3">
              <Bot className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="font-medium mb-1">Pro</h3>
            <p className="text-sm text-muted-foreground mb-3">Полный функционал</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-amber-500 h-full w-1/4 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">5 активных пользователей</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

