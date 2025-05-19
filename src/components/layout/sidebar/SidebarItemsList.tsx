
import React from "react";
import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarItem } from "./useSidebarData";

type SidebarItemsListProps = {
  items: SidebarItem[];
  isCurrentPath: (path: string) => boolean;
};

export function SidebarItemsList({ items, isCurrentPath }: SidebarItemsListProps) {
  return (
    <div className="px-2 py-2.5 bg-muted/30 rounded-md mx-2 mb-2">
      <SidebarMenu>
        {items.map(item => {
          const IconComponent = item.icon;
          return (
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
                  <IconComponent className="h-4 w-4 stroke-primary" />
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
          );
        })}
      </SidebarMenu>
    </div>
  );
}
