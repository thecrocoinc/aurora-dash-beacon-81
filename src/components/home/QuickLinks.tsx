
import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, AlertTriangle, FileText, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Quick links for admin functions
const quickLinks = [
  {
    title: "Брейншторм",
    description: "Начать генерацию идей",
    icon: Rocket,
    path: "/brainstorm",
    color: "from-blue-500 to-blue-700",
    stats: "Инновации"
  },
  {
    title: "Решить проблему",
    description: "Обсудить сложную ситуацию",
    icon: AlertTriangle,
    path: "/problem-solving",
    color: "from-red-500 to-red-700",
    stats: "Поддержка"
  },
  {
    title: "Запросить отчет",
    description: "Сводка данных по запросу",
    icon: FileText,
    path: "/reports",
    color: "from-violet-500 to-violet-700",
    stats: "Аналитика"
  },
  {
    title: "Новости и события",
    description: "Главное в нише на сегодня",
    icon: Newspaper,
    path: "/news",
    color: "from-amber-500 to-amber-700",
    stats: "Инсайты"
  }
];

export function QuickLinks() {
  return (
    <div className="section my-12 md:my-20 grid gap-6 md:gap-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-600/80 to-emerald-700/80">
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Быстрые действия</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <NavLink 
            key={link.title} 
            to={link.path} 
            className="block hover-lift transition-all duration-200"
          >
            <Card className={`h-full overflow-hidden border-t-4 ${
              link.title === "Решить проблему"
                ? "border-t-red-500/60 hover:border-t-red-500 group"
                : "border-t-primary/60 hover:border-t-primary group"
            }`}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-full ${
                    link.title === "Решить проблему"
                      ? "bg-red-500/15 group-hover:bg-red-500/25 transition-colors"
                      : "bg-primary/15 group-hover:bg-primary/25 transition-colors"
                  }`}>
                    <link.icon className={`h-5 w-5 ${
                      link.title === "Решить проблему"
                        ? "text-red-500 group-hover:text-red-400 transition-colors"
                        : "text-primary group-hover:text-primary/80 transition-colors"
                    }`} />
                  </div>
                  <h3 className="font-medium text-foreground">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                  {link.stats && (
                    <Badge variant="outline" className={`${
                      link.title === "Решить проблему"
                        ? "bg-red-500/20 text-red-400 border-none"
                        : "bg-primary/20 text-primary border-none"
                    }`}>
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
