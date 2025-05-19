
import React from "react";
import { Database } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlansTabContent } from "./subscription/PlansTabContent";
import { SubscribersTable } from "./subscription/SubscribersTable";

export function SubscriptionManagement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-600/80 to-emerald-700/80">
          <Database className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Управление подписками</h2>
      </div>
      <p className="text-muted-foreground">Мониторинг активности подписок клиентов и настройка тарифов</p>
      
      <Tabs defaultValue="plans">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="plans">Планы</TabsTrigger>
          <TabsTrigger value="subscribers">Подписчики</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <PlansTabContent />
        </TabsContent>
        
        <TabsContent value="subscribers">
          <SubscribersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
