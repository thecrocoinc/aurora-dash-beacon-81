
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
            className="h-20"
          >
            <Link 
              to={item.path} 
              className="flex items-center gap-2 emerald-gradient rounded-lg py-2 px-3"
            >
              <IconComponent className="h-6 w-6 stroke-primary" />
              <span className="text-primary text-lg font-medium">
                {item.name}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
