
import React from "react";
import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarItem } from "./useSidebarData";

type SidebarBottomMenuProps = {
  items: SidebarItem[];
  isCurrentPath: (path: string) => boolean;
};

export function SidebarBottomMenu({ items, isCurrentPath }: SidebarBottomMenuProps) {
  return (
    <SidebarMenu>
      {items.map(item => {
        const IconComponent = item.icon;
        return (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton 
              asChild 
              isActive={isCurrentPath(item.path)} 
              tooltip={item.description}
              className="h-10"
            >
              <Link 
                to={item.path} 
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-xl py-2.5 px-4"
              >
                <IconComponent className="h-6 w-6 stroke-white" />
                <span className="text-white text-base font-bold">
                  {item.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
