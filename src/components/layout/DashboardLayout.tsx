import * as React from "react"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import CustomSidebar from "./CustomSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState("")
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null)
  const location = useLocation()
  const isMobile = useIsMobile()

  async function getProfile() {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("No user found")
      }

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`name, avatar_url`)
        .eq("id", user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setName(data.name || "No name")
        setAvatarUrl(data.avatar_url)
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  async function signOut() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <CustomSidebar />
        <div className="flex-1">
          <Header />
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

function Header() {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState("")
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null)
  const location = useLocation()
  const isMobile = useIsMobile()

  async function getProfile() {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("No user found")
      }

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`name, avatar_url`)
        .eq("id", user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setName(data.name || "No name")
        setAvatarUrl(data.avatar_url)
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  async function signOut() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

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
                  {avatarUrl ? (
                    <AvatarImage
                      src={`${avatarUrl}?width=40&height=40&fit=crop&crop=faces`}
                      alt={name}
                    />
                  ) : (
                    <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">{name}</span>
                <span className="text-muted-foreground text-xs">
                  {/* {user?.email} */}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                disabled={loading}
                className={cn({
                  "cursor-not-allowed opacity-50": loading,
                })}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
