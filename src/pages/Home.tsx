
import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { UserActivityChart } from "@/components/home/UserActivityChart";
import { StatsGrid } from "@/components/StatsGrid";
import { QuickLinks } from "@/components/home/QuickLinks";
import { ClientDataMetrics } from "@/components/home/ClientDataMetrics";
import { SubscribersTable } from "@/components/home/subscription/SubscribersTable";
import { LatestClientMessages } from "@/components/home/LatestClientMessages";

const Home = () => {
  return (
    <div className="space-y-8">
      <HeroBanner />
      
      <div className="grid gap-6 md:grid-cols-2">
        <UserActivityChart />
        <StatsGrid />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ClientDataMetrics />
        </div>
        <div>
          <QuickLinks />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LatestClientMessages />
        <SubscribersTable />
      </div>
    </div>
  );
};

export default Home;
