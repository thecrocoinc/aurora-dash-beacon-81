
import React from "react";
import { StatsGrid } from "@/components/StatsGrid";
import { HeroBanner } from "@/components/home/HeroBanner";
import { UserActivityChart } from "@/components/home/UserActivityChart";
import { SubscriptionManagement } from "@/components/home/SubscriptionManagement";
import { ClientDataMetrics } from "@/components/home/ClientDataMetrics";
import { NotificationManager } from "@/components/home/NotificationManager";
import { QuickLinks } from "@/components/home/QuickLinks";

export default function Home() {
  return (
    <section className="space-y-10">
      <HeroBanner />
      
      <hr className="border-t border-white/5 mt-12 mb-8" />
      
      {/* Бизнес-метрики */}
      <StatsGrid />
      
      {/* График активности */}
      <UserActivityChart />
      
      {/* Admin feature sections */}
      <SubscriptionManagement />
      <ClientDataMetrics />
      <NotificationManager />
      
      {/* Быстрая навигация по ключевым разделам */}
      <QuickLinks />
    </section>
  );
}
