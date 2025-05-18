
import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import CustomSidebar from "./CustomSidebar"
import { Header } from "./Header"

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <CustomSidebar />
        <div className="flex-1">
          <Header />
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto py-10 px-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
