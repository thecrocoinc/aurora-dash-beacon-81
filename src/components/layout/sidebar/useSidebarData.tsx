
import { useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, Settings } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type SidebarItem = {
  name: string;
  icon: LucideIcon;
  path: string;
  description: string;
  badge?: string;
  isPrimary: boolean;
};

export function useSidebarData() {
  const location = useLocation();

  // Main menu items
  const menuItems: SidebarItem[] = [{
    name: "Главная",
    icon: Home,
    path: "/",
    description: "Общая статистика и данные",
    isPrimary: true
  }, {
    name: "Клиенты",
    icon: Users,
    path: "/clients",
    description: "Управление профилями клиентов",
    isPrimary: false
  }, {
    name: "Профили",
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
  }];

  // Bottom menu items
  const bottomItems: SidebarItem[] = [{
    name: "Настройки",
    icon: Settings,
    path: "/settings",
    description: "Параметры системы",
    isPrimary: true
  }];

  // Helper to check if the current path matches
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return { menuItems, bottomItems, isCurrentPath };
}
