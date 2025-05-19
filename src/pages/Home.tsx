
import React from "react";
import { StatsGrid } from "@/components/StatsGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyKcalTrend } from "@/components/WeeklyKcalTrend";
import { NavLink } from "react-router-dom";
import { 
  BarChart2, 
  Bot, 
  MessageSquare, 
  Users, 
  Bell,
  Calendar,
  Utensils,
  Database,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    path: "/biz-agent",
    color: "from-amber-500 to-amber-700",
    stats: "Онлайн"
  }
];

// Admin feature sections
const featureSections = [
  {
    title: "Управление подписками",
    icon: Database,
    description: "Мониторинг активности подписок клиентов и настройка тарифов",
    color: "from-blue-500/80 to-blue-700/80",
    soon: false,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <Card className="bg-card/70 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-blue-500/20 mb-3">
              <Bot className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-medium mb-1">Базовый</h3>
            <p className="text-sm text-muted-foreground mb-3">Трекинг питания</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-blue-500 h-full w-1/2 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">15 активных пользователей</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 backdrop-blur border-primary/30">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-emerald-500/20 mb-3">
              <Bot className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-medium mb-1">Premium</h3>
            <p className="text-sm text-muted-foreground mb-3">Трекинг + AI советы</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-emerald-500 h-full w-3/4 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">12 активных пользователей</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-amber-500/20 mb-3">
              <Bot className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="font-medium mb-1">Pro</h3>
            <p className="text-sm text-muted-foreground mb-3">Полный функционал</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-amber-500 h-full w-1/4 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">5 активных пользователей</p>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: "Данные клиентов",
    icon: Heart,
    description: "Мониторинг данных о питании и активности ваших клиентов",
    color: "from-purple-500/80 to-purple-700/80",
    soon: false,
    content: (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Метрики здоровья</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Средний пульс</span>
                <div className="flex items-center">
                  <span className="font-medium health-excellent">72</span>
                  <span className="text-xs text-muted-foreground ml-2">уд/мин</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Среднее КБЖУ</span>
                <div className="flex items-center">
                  <span className="font-medium health-good">1850</span>
                  <span className="text-xs text-muted-foreground ml-2">ккал</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Средняя активность</span>
                <div className="flex items-center">
                  <span className="font-medium health-average">6,200</span>
                  <span className="text-xs text-muted-foreground ml-2">шагов</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Средний сон</span>
                <div className="flex items-center">
                  <span className="font-medium health-poor">6.4</span>
                  <span className="text-xs text-muted-foreground ml-2">часов</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full" variant="outline">Подробная аналитика</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="h-4 w-4 text-emerald-400" />
              <span>Трекинг питания</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Завтраки</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-emerald-500 h-full w-4/5 rounded-full"></div>
                </div>
                <span className="text-xs">80%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Обеды</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-emerald-500 h-full w-3/4 rounded-full"></div>
                </div>
                <span className="text-xs">75%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Ужины</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-emerald-500 h-full w-5/6 rounded-full"></div>
                </div>
                <span className="text-xs">83%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Перекусы</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-emerald-500 h-full w-1/3 rounded-full"></div>
                </div>
                <span className="text-xs">33%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Вода</span>
                <div className="w-36 h-2 bg-muted/50 rounded-full">
                  <div className="bg-blue-500 h-full w-2/3 rounded-full"></div>
                </div>
                <span className="text-xs">67%</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full" variant="outline">Детальный отчет</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: "Управление уведомлениями",
    icon: Bell,
    description: "Настройка уведомлений и рассылок для ваших клиентов",
    color: "from-amber-500/80 to-amber-700/80",
    soon: false,
    content: (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/70 backdrop-blur col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Запланированные рассылки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-background/40">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Новые рецепты недели</p>
                    <p className="text-xs text-muted-foreground">Запланировано на завтра, 9:00</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">32 получателя</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md bg-background/40">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-medium">Еженедельная сводка прогресса</p>
                    <p className="text-xs text-muted-foreground">Воскресенье, 18:00</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Всем</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md bg-background/40">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="font-medium">Обновление функций AI</p>
                    <p className="text-xs text-muted-foreground">Пятница, 12:00</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Premium и Pro</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">Создать рассылку</Button>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg">Эффективность</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">76%</div>
              <p className="text-sm text-muted-foreground">Средний open rate</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">42%</div>
              <p className="text-sm text-muted-foreground">Средний click rate</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">12%</div>
              <p className="text-sm text-muted-foreground">Конверсия в покупку</p>
            </div>
            
            <Button variant="outline" className="w-full">Аналитика</Button>
          </CardContent>
        </Card>
      </div>
    )
  },
];

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="rounded-3xl glass-morphism p-8 md:p-10 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-violet-600/80 z-[-1]"></div>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Панель управления AI-Nutrition</h1>
          <p className="text-lg md:text-xl mb-6 text-blue-50">
            Управляйте вашим AI-ботом для трекинга питания и здоровья, анализируйте данные клиентов и развивайте свой бизнес
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur">Обзор возможностей</Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">Техподдержка</Button>
          </div>
        </div>
      </div>
      
      {/* Бизнес-метрики */}
      <StatsGrid />
      
      {/* График активности */}
      <Card className="card-gradient overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Активность пользователей</CardTitle>
          <div className="flex items-center text-sm space-x-4">
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-400 mr-1"></span>
              Пользователи
            </span>
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-emerald-400 mr-1"></span>
              Активность
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <WeeklyKcalTrend />
        </CardContent>
      </Card>
      
      {/* Admin feature sections */}
      {featureSections.map((section, idx) => (
        <div key={section.title} className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color}`}>
              <section.icon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {section.soon && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">Скоро</span>
            )}
          </div>
          <p className="text-muted-foreground">{section.description}</p>
          {section.content}
        </div>
      ))}
      
      {/* Быстрая навигация по ключевым разделам */}
      <div className="pt-6">
        <h2 className="text-xl font-semibold mb-6">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <NavLink key={link.title} to={link.path} className="block hover-lift">
              <Card className="h-full overflow-hidden card-gradient border-t-4 border-t-primary/60">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full glass-morphism">
                      <link.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-medium">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                    {link.stats && (
                      <span className="text-xs py-1 px-3 bg-primary/10 text-primary rounded-full">
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
    </section>
  );
}
