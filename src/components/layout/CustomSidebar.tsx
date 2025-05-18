
import { Link } from "react-router-dom";
import { 
  Home, 
  Users, 
  MessageCircle, 
  Settings, 
  Bot, 
  BarChart2 
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
} from "@/components/ui/sidebar";

export function CustomSidebar() {
  const menuItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Profiles",
      icon: Users,
      path: "/profiles",
    },
    {
      name: "Dialogs",
      icon: MessageCircle,
      path: "/dialogs",
    },
  ];
  
  const disabledItems = [
    {
      name: "Dashboard (soon)",
      icon: BarChart2,
      path: "#",
      disabled: true,
    },
  ];
  
  const bottomItems = [
    {
      name: "BizAgent",
      icon: Bot,
      path: "/biz-agent",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const isCurrentPath = (path: string) => {
    return window.location.pathname === path;
  };
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={isCurrentPath(item.path)}
                tooltip={item.name}
              >
                <Link to={item.path}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
          <SidebarSeparator />
          
          {disabledItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild
                className="text-muted-foreground cursor-not-allowed"
              >
                <span>
                  <item.icon />
                  <span>{item.name}</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupLabel>System</SidebarGroupLabel>
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={isCurrentPath(item.path)}
                tooltip={item.name}
              >
                <Link to={item.path}>
                  <item.icon />
                  <span>{item.name}</span>
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
