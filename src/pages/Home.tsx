
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { Bot, HeartPulse, MessageCircle, Settings, Users } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const Home = () => {
  // Simulate no data scenario (remove this line when implementing actual data fetching)
  const hasData = false;

  const menuItems = [
    {
      title: "Profiles",
      description: "Manage nutrition profiles and monitor progress",
      icon: Users,
      path: "/profiles"
    },
    {
      title: "Dialogs",
      description: "View and respond to user conversations",
      icon: MessageCircle,
      path: "/dialogs"
    },
    {
      title: "Settings",
      description: "Configure application settings",
      icon: Settings,
      path: "/settings"
    },
    {
      title: "BizAgent",
      description: "Access AI-powered nutrition assistance",
      icon: Bot,
      path: "/biz-agent"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to Nutrio Dashboard. Select a menu option to continue.
      </p>

      {hasData ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item) => (
            <NavLink key={item.title} to={item.path}>
              <Card className="hover:bg-accent/50 transition-colors duration-200 h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </NavLink>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-10">
            <EmptyState
              icon={HeartPulse}
              title="Healthy starts here"
              description="Connect your bot to see live stats"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
