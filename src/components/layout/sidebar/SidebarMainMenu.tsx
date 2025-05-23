
import React from "react";
import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarItem } from "./useSidebarData";

type SidebarMainMenuProps = {
  item: SidebarItem;
  isActive: boolean;
};

export function SidebarMainMenu({ item, isActive }: SidebarMainMenuProps) {
  const IconComponent = item.icon;
  
  return (
    <div className="px-2 py-3 mb-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton 
            asChild 
            isActive={isActive} 
            tooltip={item.description}
            className="h-10"
          >
            <Link 
              to={item.path} 
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-[12px] py-2.5 px-4"
            >
              <IconComponent className="h-6 w-6 stroke-white" />
              <span className="text-white text-base font-bold">
                {item.name === "Панель управления" ? "Главная" : item.name}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
