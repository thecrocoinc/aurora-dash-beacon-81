
import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import CustomSidebar from "./CustomSidebar"
import { Header } from "./Header"
import { Outlet } from "react-router-dom"

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarProvider>
        <CustomSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
