
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, Settings, Bot, BarChart2, Database, Bell, ChevronDown, ChevronRight } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarHeader } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function CustomSidebar() {
  const location = useLocation();
  const [openItems, setOpenItems] = useState<string[]>(["dashboard"]);

  const toggleCollapsible = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Nested menu structure
  const dashboardSubItems = [
    {
      name: "Клиенты",
      icon: Users,
      path: "/profiles",
      badge: "32"
    },
    {
      name: "Диалоги",
      icon: MessageSquare,
      path: "/dialogs",
      badge: "5"
    },
    {
      name: "Аналитика",
      icon: BarChart2,
      path: "/biz-agent"
    },
    {
      name: "Рассылки",
      icon: Bell,
      path: "/notifications",
      badge: "New"
    }
  ];

  // Admin tools
  const featureItems = [{
    name: "Телеграм-бот",
    icon: Bot,
    path: "/bot",
    description: "Настройки и шаблоны бота"
  }, {
    name: "Интеграции",
    icon: Database,
    path: "/subscription",
    description: "API и внешние сервисы",
    badge: "Pro"
  }];

  const bottomItems = [{
    name: "Настройки",
    icon: Settings,
    path: "/settings",
    description: "Параметры системы"
  }];

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="w-56 border-r border-white/10 bg-sidebar backdrop-blur">
      <SidebarHeader className="py-6">
        <div className="px-4">
          <h2 className="text-lg font-semibold text-center text-primary">
            AI-Nutrition Admin
          </h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Collapsible Dashboard Menu */}
        <div className="px-2 py-2.5 bg-muted/30 rounded-md mx-2 mb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible 
                open={openItems.includes("dashboard")} 
                className="w-full"
              >
                <CollapsibleTrigger 
                  onClick={() => toggleCollapsible("dashboard")}
                  className="flex w-full items-center justify-between p-2 rounded-md text-sm hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 stroke-primary" />
                    <span className="text-white">Панель управления</span>
                  </div>
                  {openItems.includes("dashboard") ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </CollapsibleTrigger>
                
                <CollapsibleContent className="ml-5 mt-1 space-y-1">
                  {dashboardSubItems.map(item => (
                    <SidebarMenuButton 
                      key={item.name} 
                      asChild 
                      isActive={isCurrentPath(item.path)} 
                      size="sm"
                    >
                      <Link to={item.path} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 stroke-primary" />
                        <span className="text-white">{item.name}</span>
                        {item.badge && (
                          <span className="ml-auto text-[10px] bg-primary/20 text-primary rounded-full px-2 py-0.5">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <SidebarSeparator className="my-2" />
        
        <div className="px-2 py-2.5 bg-muted/30 rounded-md mx-2 mb-2">
          <SidebarGroupLabel className="text-primary text-[13px] font-medium mb-2 px-2">
            Инструменты админа
          </SidebarGroupLabel>
          <SidebarMenu>
            {featureItems.map(item => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isCurrentPath(item.path)} tooltip={item.description}>
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 stroke-primary" />
                    <span className="text-white">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          {bottomItems.map(item => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isCurrentPath(item.path)} tooltip={item.description}>
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 stroke-primary" />
                  <span className="text-white">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <div className="p-4 mt-4">
          <div className="rounded-lg p-3 bg-muted/50 text-xs">
            <div className="flex justify-between items-center">
              <p className="font-medium text-primary">Pro План</p>
              <p className="text-primary/70">30 дней</p>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-gold-dim h-full w-[70%]"></div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default CustomSidebar;
