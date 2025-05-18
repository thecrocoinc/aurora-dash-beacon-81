
import React from "react";
import { StatsGrid } from "@/components/StatsGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyKcalTrend } from "@/components/WeeklyKcalTrend";
import { NavLink } from "react-router-dom";
import { BarChart2, Bot, MessageCircle, Users } from "lucide-react";

export default function Home() {
  // Основные разделы для быстрой навигации
  const quickLinks = [
    {
      title: "Клиенты",
      description: "Управление профилями и прогрессом",
      icon: Users,
      path: "/profiles",
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Диалоги",
      description: "Просмотр и ответы на сообщения",
      icon: MessageCircle,
      path: "/dialogs",
      color: "from-emerald-500 to-emerald-700"
    },
    {
      title: "Аналитика",
      description: "Метрики конверсии и доходности",
      icon: BarChart2,
      path: "/biz-agent",
      color: "from-violet-500 to-violet-700"
    },
    {
      title: "AI Ассистент",
      description: "Автоматизация бизнес-задач",
      icon: Bot,
      path: "/biz-agent",
      color: "from-amber-500 to-amber-700"
    }
  ];

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-500 via-lime-500 to-yellow-300 p-10 text-white">
        <h1 className="text-3xl font-bold">AI-Nutrition Console</h1>
        <p className="mt-2 text-lg max-w-2xl">
          Track meals, coach with GPT-4o and grow revenue — all in one dashboard.
        </p>
      </div>
      
      {/* Бизнес-метрики */}
      <StatsGrid />
      
      {/* График роста */}
      <Card>
        <CardHeader>
          <CardTitle>Недельная активность</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyKcalTrend />
        </CardContent>
      </Card>
      
      {/* Быстрая навигация по ключевым разделам */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <NavLink key={link.title} to={link.path}>
            <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${link.color}`}></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </div>
    </section>
  );
}
