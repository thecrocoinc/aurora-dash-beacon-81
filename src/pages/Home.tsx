
import React from "react";
import { StatsGrid } from "@/components/StatsGrid";
import { HeroBanner } from "@/components/home/HeroBanner";
import { UserActivityChart } from "@/components/home/UserActivityChart";
import { SubscriptionManagement } from "@/components/home/SubscriptionManagement";
import { QuickLinks } from "@/components/home/QuickLinks";
import { BarChart2, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <section className="space-y-10">
      {/* Hero Banner */}
      <HeroBanner />
      
      <hr className="border-t border-white/5 mt-12 mb-8" />
      
      {/* Бизнес-метрики */}
      <div className="section">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-600/80 to-emerald-700/80">
            <BarChart2 className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Ключевые показатели</h2>
        </div>
        <StatsGrid />
      </div>
      
      {/* График активности */}
      <UserActivityChart />
      
      {/* Admin feature section */}
      <div className="section">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-600/80 to-emerald-700/80">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Управление подписками</h2>
        </div>
        <SubscriptionManagement />
      </div>
      
      {/* Быстрая навигация по ключевым разделам */}
      <QuickLinks />
    </section>
  );
}
