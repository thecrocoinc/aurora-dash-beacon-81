
import * as React from "react"
import { useLocation } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageSquare, BarChart2 } from "lucide-react"

export function Header() {
  const location = useLocation()
  const isMobile = useIsMobile()

  // Mapping paths to display names
  const pathNames = {
    "/": "Панель управления",
    "/profiles": "Клиенты",
    "/dialogs": "Диалоги",
    "/settings": "Настройки",
    "/biz-agent": "AI Ассистент",
    "/bot": "Телеграм-бот",
    "/subscription": "Подписки",
    "/notifications": "Рассылки",
  }

  // Get current page title
  const currentPath = location.pathname
  const pageTitle = pathNames[currentPath as keyof typeof pathNames] || "AI-Nutrition Admin"

  return (
    <header className="sticky top-0 z-10 border-b border-gold/10 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex flex-1 items-center">
          <h1 className="ml-2 text-sm font-bold md:text-base premium-text">
            {pageTitle}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* App actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <BarChart2 className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold flex items-center justify-center text-[10px] text-black font-medium">+8%</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-gold" />
            </Button>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-gold" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full overflow-hidden glass-morphism border border-gold/20">
                <Avatar className="h-9 w-9 border-none">
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop" alt="Admin" />
                  <AvatarFallback className="bg-transparent text-white">НП</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card/90 backdrop-blur-lg border border-gold/10" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col gap-1.5">
                <span className="text-sm font-medium leading-none">Наталья Петрова</span>
                <span className="text-muted-foreground text-xs">
                  admin@ai-nutrition.com
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Профиль</DropdownMenuItem>
              <DropdownMenuItem>Подписка</DropdownMenuItem>
              <DropdownMenuItem>Настройки бота</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
