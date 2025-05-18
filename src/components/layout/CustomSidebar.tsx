
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  MessageCircle, 
  Settings, 
  Bot, 
  BarChart2 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function CustomSidebar() {
  const location = useLocation();
  
  // These menu items match the quickLinks from Home.tsx
  const menuItems = [
    {
      name: "Главная",
      icon: Home,
      path: "/",
    },
    {
      name: "Клиенты",
      icon: Users,
      path: "/profiles",
      description: "Управление профилями и прогрессом",
    },
    {
      name: "Диалоги",
      icon: MessageCircle,
      path: "/dialogs",
      description: "Просмотр и ответы на сообщения",
    },
    {
      name: "Аналитика",
      icon: BarChart2,
      path: "/biz-agent",
      description: "Метрики конверсии и доходности",
    },
  ];
  
  const bottomItems = [
    {
      name: "AI Ассистент",
      icon: Bot,
      path: "/biz-agent",
      description: "Автоматизация бизнес-задач",
    },
    {
      name: "Настройки",
      icon: Settings,
      path: "/settings",
      description: "Параметры системы",
    },
  ];

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Sidebar className="w-56 border-r bg-sidebar backdrop-blur">
      <SidebarHeader className="py-6">
        <div className="px-4">
          <h2 className="text-lg font-semibold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI-Nutrition
          </h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={isCurrentPath(item.path)}
                tooltip={item.description}
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroupLabel>Система</SidebarGroupLabel>
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={isCurrentPath(item.path)}
                tooltip={item.description}
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default CustomSidebar;
