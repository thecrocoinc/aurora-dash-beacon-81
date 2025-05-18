
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
  Apple, 
  Calendar,
  Utensils,
  Camera,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import MealTilePlaceholder from "@/components/MealTilePlaceholder";

// Feature sections for the Home page
const featureSections = [
  {
    title: "Wearables Integration",
    icon: Apple,
    description: "Sync data from Apple Watch and Android wearables for continuous health tracking",
    color: "from-blue-500/80 to-blue-700/80",
    soon: false,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <Card className="bg-card/70 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-blue-500/20 mb-3">
              <Apple className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-medium mb-1">Apple Watch</h3>
            <p className="text-sm text-muted-foreground mb-3">Heartrate, Sleep, Activity</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-blue-500 h-full w-3/4 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">3 metrics synchronized</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-emerald-500/20 mb-3">
              <Calendar className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-medium mb-1">Daily Activity</h3>
            <p className="text-sm text-muted-foreground mb-3">Steps, Calories, Distance</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-emerald-500 h-full w-4/5 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">24/7 monitoring active</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full p-3 bg-amber-500/20 mb-3">
              <Utensils className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="font-medium mb-1">Nutrition Log</h3>
            <p className="text-sm text-muted-foreground mb-3">Meals, Macros, Hydration</p>
            <div className="w-full bg-muted/50 h-2 rounded-full">
              <div className="bg-amber-500 h-full w-2/3 rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">5 recent meals logged</p>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: "AI Meal Recognition",
    icon: Camera,
    description: "Take photos of your meals or fridge contents for instant nutritional analysis",
    color: "from-purple-500/80 to-purple-700/80",
    soon: false,
    content: (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Recent Meals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MealTilePlaceholder />
            <MealTilePlaceholder />
            <MealTilePlaceholder />
            <MealTilePlaceholder />
          </div>
        </div>
        
        <Card className="card-gradient relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Camera className="w-40 h-40" />
          </div>
          <CardHeader>
            <CardTitle>AI Food Recognition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Instantly recognize and analyze food with our advanced AI model.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">1</span>
                </div>
                <p className="text-sm">Take a photo of your meal</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">2</span>
                </div>
                <p className="text-sm">Get instant nutritional breakdown</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">3</span>
                </div>
                <p className="text-sm">Receive personalized recommendations</p>
              </div>
            </div>
            
            <Button className="w-full mt-4">Open Camera</Button>
          </CardContent>
        </Card>
      </div>
    )
  },
];

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
    icon: MessageSquare,
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

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="rounded-3xl glass-morphism p-8 md:p-10 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-violet-600/80 z-[-1]"></div>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Nutrition Console</h1>
          <p className="text-lg md:text-xl mb-6 text-blue-50">
            Интеллектуальная система для отслеживания питания и тренировок с помощью AI и данных с носимых устройств
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur">Начать работу</Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">Узнать больше</Button>
          </div>
        </div>
      </div>
      
      {/* Бизнес-метрики */}
      <StatsGrid />
      
      {/* График роста */}
      <Card className="card-gradient overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Недельная активность</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyKcalTrend />
        </CardContent>
      </Card>
      
      {/* Feature showcases */}
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
        <h2 className="text-xl font-semibold mb-6">Основные разделы</h2>
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
