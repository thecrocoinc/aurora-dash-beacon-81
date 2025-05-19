
import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, BarChart2, Mail, Bug, Star, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarSeparator, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarMainMenu } from "./sidebar/SidebarMainMenu";
import { SidebarItemsList } from "./sidebar/SidebarItemsList";
import { SidebarBottomMenu } from "./sidebar/SidebarBottomMenu";
import { useSidebarData } from "./sidebar/useSidebarData";

export function CustomSidebar() {
  const location = useLocation();
  const { menuItems, bottomItems, isCurrentPath } = useSidebarData();

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
        <SidebarMainMenu 
          item={menuItems[0]} 
          isActive={isCurrentPath(menuItems[0].path)}
        />
        
        {/* Основное меню - все прочие пункты в одном блоке */}
        <SidebarItemsList 
          items={menuItems.slice(1)} 
          isCurrentPath={isCurrentPath} 
        />
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarSeparator className="my-2" />
        <SidebarBottomMenu 
          items={bottomItems} 
          isCurrentPath={isCurrentPath} 
        />
      </SidebarFooter>
    </Sidebar>
  );
}

export default CustomSidebar;
