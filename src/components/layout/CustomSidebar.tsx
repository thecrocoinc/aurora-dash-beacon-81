
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  MessageSquare, 
  Settings, 
  Bot, 
  BarChart2, 
  Apple,
  Utensils,
  Camera,
  Heart
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
      icon: MessageSquare,
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
  
  const featureItems = [
    {
      name: "Здоровье",
      icon: Heart,
      path: "/health",
      description: "Статистика здоровья",
    },
    {
      name: "Интеграции",
      icon: Apple,
      path: "/integrations",
      description: "Подключение устройств",
    },
    {
      name: "Питание",
      icon: Utensils,
      path: "/nutrition",
      description: "Анализ питания",
    },
    {
      name: "AI Сканер",
      icon: Camera,
      path: "/scanner",
      description: "Распознавание еды",
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
    <Sidebar className="w-56 border-r border-white/10 bg-sidebar backdrop-blur">
      <SidebarHeader className="py-6">
        <div className="px-4">
          <h2 className="text-lg font-semibold text-center bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
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

        <SidebarSeparator />
        
        <SidebarGroupLabel>Функции</SidebarGroupLabel>
        <SidebarMenu>
          {featureItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={isCurrentPath(item.path)}
                tooltip={item.description}
              >
                <Link to={item.path || "#"} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {!item.path && <span className="ml-auto text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">Скоро</span>}
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
        
        <div className="p-4 mt-4">
          <div className="rounded-lg p-3 bg-primary/10 text-primary text-xs text-center">
            <p className="font-medium">Версия 0.9.2</p>
            <p className="text-primary/70 mt-1">Бета-тестирование</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default CustomSidebar;
