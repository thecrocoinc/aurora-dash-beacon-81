
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
                className="flex items-center gap-2 emerald-gradient rounded-lg py-2 px-3"
              >
                <IconComponent className="h-5 w-5 stroke-primary" />
                <span className="text-primary font-medium">
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
