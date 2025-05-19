
import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Bot, MessageSquare, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Quick links for admin functions
const quickLinks = [
  {
    title: "Клиенты",
    description: "Управление пользователями",
    icon: Users,
    path: "/profiles",
    color: "from-blue-500 to-blue-700",
    stats: "32 активных"
  },
  {
    title: "Диалоги",
    description: "Чаты и сообщения",
    icon: MessageSquare,
    path: "/dialogs",
    color: "from-emerald-500 to-emerald-700",
    stats: "5 непрочитанных"
  },
  {
    title: "Аналитика",
    description: "Метрики и отчеты",
    icon: BarChart2,
    path: "/biz-agent",
    color: "from-violet-500 to-violet-700",
    stats: "+12% к конверсии"
  },
  {
    title: "Телеграм-бот",
    description: "Настройки бота",
    icon: Bot,
    path: "/bot",
    color: "from-amber-500 to-amber-700",
    stats: "Онлайн"
  }
];

export function QuickLinks() {
  return (
    <div className="section my-12 md:my-20 grid gap-6 md:gap-8">
      <div className="section-header">
        <div className="icon">
          <Users className="h-5 w-5" />
        </div>
        <h2>Быстрые действия</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <NavLink key={link.title} to={link.path} className="block hover-lift">
            <Card className="h-full overflow-hidden border-t-4 border-t-primary/60">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/15">
                    <link.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                  {link.stats && (
                    <Badge variant="outline" className="bg-primary/20 text-primary border-none">
                      {link.stats}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
