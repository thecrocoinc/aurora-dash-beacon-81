
import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, BarChart2, Mail, Bug, Star, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarHeader } from "@/components/ui/sidebar";

export function CustomSidebar() {
  const location = useLocation();

  // Основное меню с обновленным стилем
  const menuItems = [{
    name: "Панель управления",
    icon: Home,
    path: "/",
    description: "Общая статистика и данные",
    isPrimary: true
  }, {
    name: "Клиенты",
    icon: Users,
    path: "/profiles",
    description: "Управление пользователями бота",
    badge: "32",
    isPrimary: false
  }, {
    name: "Диалоги",
    icon: MessageSquare,
    path: "/dialogs",
    description: "Чаты между клиентами и ботом",
    badge: "5",
    isPrimary: false
  }, {
    name: "Аналитика",
    icon: BarChart2,
    path: "/biz-agent",
    description: "Статистика и отчеты бизнеса",
    isPrimary: false
  }, {
    name: "Рассылки",
    icon: Mail,
    path: "/notifications",
    description: "Управление рассылками",
    badge: "New",
    isPrimary: false
  }, {
    name: "Баги",
    icon: Bug,
    path: "/bugs",
    description: "Отчеты об ошибках",
    isPrimary: false
  }, {
    name: "Отзывы",
    icon: Star,
    path: "/reviews",
    description: "Отзывы пользователей",
    isPrimary: false
  }];

  // Настройки отдельно внизу
  const bottomItems = [{
    name: "Настройки",
    icon: Settings,
    path: "/settings",
    description: "Параметры системы",
    isPrimary: true
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
        {/* Главный пункт - Панель управления */}
        <div className="px-2 py-3 mb-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isCurrentPath(menuItems[0].path)} 
                tooltip={menuItems[0].description}
                className="h-10" // Повышенная высота для главных пунктов
              >
                <Link 
                  to={menuItems[0].path} 
                  className="flex items-center gap-2 emerald-gradient rounded-lg py-2 px-3"
                >
                  <menuItems[0].icon className="h-5 w-5 stroke-primary" />
                  <span className="text-primary font-medium">
                    {menuItems[0].name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
        
        {/* Основное меню - все прочие пункты в одном блоке */}
        <div className="px-2 py-2.5 bg-muted/30 rounded-md mx-2 mb-2">
          <SidebarMenu>
            {menuItems.slice(1).map(item => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isCurrentPath(item.path)} 
                  tooltip={item.description}
                >
                  <Link 
                    to={item.path} 
                    className="flex items-center gap-2"
                  >
                    <item.icon className="h-4 w-4 stroke-primary" />
                    <span>
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] bg-primary/20 text-primary rounded-full px-2 py-0.5">
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
        <SidebarSeparator className="my-2" />
        <SidebarMenu>
          {bottomItems.map(item => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={isCurrentPath(item.path)} 
                tooltip={item.description}
                className="h-10" // Повышенная высота для главных пунктов
              >
                <Link 
                  to={item.path} 
                  className="flex items-center gap-2 emerald-gradient rounded-lg py-2 px-3"
                >
                  <item.icon className="h-5 w-5 stroke-primary" />
                  <span className="text-primary font-medium">
                    {item.name}
                  </span>
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
