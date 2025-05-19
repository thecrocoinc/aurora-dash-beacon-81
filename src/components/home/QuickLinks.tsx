
import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Bot, MessageSquare, Users } from "lucide-react";

// Quick links for admin functions
const quickLinks = [
  {
    title: "Клиенты",
    description: "Управление пользователями",
    icon: Users,
    path: "/profiles",
    color: "gold",
    stats: "32 активных"
  },
  {
    title: "Диалоги",
    description: "Чаты и сообщения",
    icon: MessageSquare,
    path: "/dialogs",
    color: "emerald",
    stats: "5 непрочитанных"
  },
  {
    title: "Аналитика",
    description: "Метрики и отчеты",
    icon: BarChart2,
    path: "/biz-agent",
    color: "gold",
    stats: "+12% к конверсии"
  },
  {
    title: "Телеграм-бот",
    description: "Настройки бота",
    icon: Bot,
    path: "/bot",
    color: "emerald",
    stats: "Онлайн"
  }
];

export function QuickLinks() {
  return (
    <div className="section">
      <div className="section-header">
        <div className="icon">
          <Users className="h-5 w-5" />
        </div>
        <h2>Быстрые действия</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <NavLink key={link.title} to={link.path} className="block hover-lift">
            <Card className={`h-full overflow-hidden ${link.color === 'emerald' ? 'card-accent-emerald' : 'card-accent-gold'}`}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-full glass-morphism ${link.color === 'emerald' ? 'border-[var(--color-emerald-start)]/20' : 'border-[var(--color-primary-start)]/20'}`}>
                    <link.icon className={`h-5 w-5 ${link.color === 'emerald' ? 'text-[var(--color-emerald-start)]' : 'text-[var(--color-primary-start)]'}`} />
                  </div>
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                  {link.stats && (
                    <span className={`text-xs py-1 px-3 ${link.color === 'emerald' 
                      ? 'bg-[var(--color-emerald-start)]/10 text-[var(--color-emerald-start)]' 
                      : 'bg-[var(--color-primary-start)]/10 text-[var(--color-primary-start)]'} rounded-full`}>
                      {link.stats}
                    </span>
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
