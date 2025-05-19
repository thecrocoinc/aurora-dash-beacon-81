
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlansTabContent } from "./subscription/PlansTabContent";
import { SubscribersTable } from "./subscription/SubscribersTable";

export function SubscriptionManagement() {
  return (
    <div className="space-y-4">
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
