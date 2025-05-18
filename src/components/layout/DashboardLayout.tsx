
import * as React from "react"
import { useLocation } from "react-router-dom"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomSidebar from "./CustomSidebar";

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

function Header() {
  const location = useLocation()
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex flex-1 items-center">
          <Button variant="ghost" size="icon" aria-label="Toggle Menu">
            {/* <Menu className="h-5 w-5" /> */}
          </Button>
          <p className="ml-2 text-sm font-bold md:text-base">Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>NU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">Guest User</span>
                <span className="text-muted-foreground text-xs">
                  guest@example.com
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Sign in
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
