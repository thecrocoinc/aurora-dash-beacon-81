
import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, Settings, Bot, BarChart2, Database, Bell } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarHeader } from "@/components/ui/sidebar";
export function CustomSidebar() {
  const location = useLocation();

  // Streamlined admin dashboard main menu items
  const menuItems = [{
    name: "Панель управления",
    icon: Home,
    path: "/",
    description: "Общая статистика и данные"
  }, {
    name: "Клиенты",
    icon: Users,
    path: "/profiles",
    description: "Управление пользователями бота",
    badge: "32"
  }, {
    name: "Диалоги",
    icon: MessageSquare,
    path: "/dialogs",
    description: "Чаты между клиентами и ботом",
    badge: "5"
  }, {
    name: "Аналитика",
    icon: BarChart2,
    path: "/biz-agent",
    description: "Статистика и отчеты бизнеса"
  }];

  // Focused admin tools
  const featureItems = [{
    name: "Телеграм-бот",
    icon: Bot,
    path: "/bot",
    description: "Настройки и шаблоны бота"
  }, {
    name: "Подписки",
    icon: Database,
    path: "/subscription",
    description: "Тарифы и управление"
  }, {
    name: "Рассылки",
    icon: Bell,
    path: "/notifications",
    description: "Уведомления клиентам",
    badge: "New"
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
  return <Sidebar className="w-56 border-r border-white/10 bg-sidebar backdrop-blur">
      <SidebarHeader className="py-6">
        <div className="px-4">
          <h2 className="text-lg font-semibold text-center text-[var(--color-primary-0)]">
            AI-Nutrition Admin
          </h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(item => <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isCurrentPath(item.path)} tooltip={item.description}>
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 stroke-[var(--color-primary-0)]" />
                  <span className="text-white">{item.name}</span>
                  {item.badge && <span className="ml-auto text-[10px] bg-[var(--color-primary-0)]/20 text-[var(--color-primary-0)] rounded-full px-2 py-0.5">
                      {item.badge}
                    </span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>)}
        </SidebarMenu>

        <SidebarSeparator />
        
        <SidebarGroupLabel className="bg-inherit">Инструменты админа</SidebarGroupLabel>
        <SidebarMenu>
          {featureItems.map(item => <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isCurrentPath(item.path)} tooltip={item.description}>
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 stroke-[var(--color-primary-0)]" />
                  <span className="text-white">{item.name}</span>
                  {item.badge && <span className="ml-auto text-[10px] bg-[var(--color-primary-0)]/20 text-[var(--color-primary-0)] px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>)}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          {bottomItems.map(item => <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isCurrentPath(item.path)} tooltip={item.description}>
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 stroke-[var(--color-primary-0)]" />
                  <span className="text-white">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>)}
        </SidebarMenu>
        
        <div className="p-4 mt-4">
          <div className="rounded-lg p-3 bg-[var(--color-surface-muted)]/50 text-xs">
            <div className="flex justify-between items-center">
              <p className="font-medium text-[var(--color-primary-0)]">Pro План</p>
              <p className="text-[var(--color-primary-0)]/70">30 дней</p>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[var(--color-primary-0)] to-[var(--color-primary-1)] h-full w-[70%]"></div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>;
}
export default CustomSidebar;
