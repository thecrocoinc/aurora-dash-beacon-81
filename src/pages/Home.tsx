
import React from "react";
import { StatsGrid } from "@/components/StatsGrid";
import { HeroBanner } from "@/components/home/HeroBanner";
import { UserActivityChart } from "@/components/home/UserActivityChart";
import { SubscriptionManagement } from "@/components/home/SubscriptionManagement";
import { QuickLinks } from "@/components/home/QuickLinks";

export default function Home() {
  return (
    <section className="space-y-10">
      {/* Hero Banner */}
      <HeroBanner />
      
      <hr className="border-t border-white/5 mt-12 mb-8" />
      
      {/* Бизнес-метрики */}
      <div className="section">
        <div className="section-header">
          <div className="icon">
            <BarChart className="h-5 w-5" />
          </div>
          <h2>Ключевые показатели</h2>
        </div>
        <StatsGrid />
      </div>
      
      {/* График активности */}
      <UserActivityChart />
      
      {/* Admin feature section */}
      <SubscriptionManagement />
      
      {/* Быстрая навигация по ключевым разделам */}
      <QuickLinks />
    </section>
  );
}

// Импортируем BarChart для заголовка секции метрик
import { BarChart } from "lucide-react";
