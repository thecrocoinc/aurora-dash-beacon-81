
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
      
      {/* Two-column grid for activity chart and stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserActivityChart />
        <StatsGrid />
      </div>

      {/* Three-column grid with client data taking 2/3 of space */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ClientDataMetrics />
        </div>
        <div>
          <QuickLinks />
        </div>
      </div>

      {/* Two-column grid for messages and subscribers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LatestClientMessages />
        <SubscribersTable />
      </div>
    </div>
  );
};

export default Home;
