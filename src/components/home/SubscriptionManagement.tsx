
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Database, Bot, Users, ArrowRight, CheckIcon, XIcon, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function SubscriptionManagement() {
  // Enhanced data for active subscribers
  const recentSubscribers = [
    { 
      id: 1, 
      name: "Анна М.", 
      avatar: "A",
      plan: "Premium", 
      date: "20 Мая", 
      status: "active"
    },
    { 
      id: 2, 
      name: "Сергей К.", 
      avatar: "С",
      plan: "Basic", 
      date: "20 Мая", 
      status: "active"
    },
    { 
      id: 3, 
      name: "Ирина Л.", 
      avatar: "И",
      plan: "Premium", 
      date: "20 Мая", 
      status: "trial"
    },
    { 
      id: 4, 
      name: "Павел В.", 
      avatar: "П",
      plan: "Basic", 
      date: "20 Мая", 
      status: "pending"
    },
  ];

  // Status badge component for better visual representation
  const StatusBadge = ({ status }: { status: string }) => {
    switch(status) {
      case 'active':
        return (
          <Badge variant="outline" className="border-0 bg-emerald-500/20 text-emerald-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Активна
          </Badge>
        );
      case 'trial':
        return (
          <Badge variant="outline" className="border-0 bg-amber-500/20 text-amber-500 flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            Пробный период
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="border-0 bg-blue-500/20 text-blue-500 flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3" />
            Ожидание
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-0 bg-muted text-muted-foreground">
            {status}
          </Badge>
        );
    }
  };

  // Plan badge component
  const PlanBadge = ({ plan }: { plan: string }) => {
    return (
      <Badge variant="outline" className={`border-0 ${
        plan === 'Premium' 
          ? 'bg-emerald-500/10 text-emerald-500' 
          : 'bg-primary/10 text-primary'
      }`}>
        {plan}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-600/80 to-emerald-700/80">
          <Database className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Управление подписками</h2>
      </div>
      <p className="text-muted-foreground">Мониторинг активности подписок клиентов и настройка тарифов</p>
      
      <Tabs defaultValue="plans">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="plans">Планы</TabsTrigger>
          <TabsTrigger value="subscribers">Подписчики</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Basic Plan - Redesigned with more modern style */}
            <Card className="bg-zinc-900 border border-zinc-800 overflow-hidden relative shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/50 to-transparent opacity-70 pointer-events-none"></div>
              <div className="relative z-10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2.5 rounded-full">
                        <Bot className="h-5 w-5 text-blue-400" />
                      </div>
                      <CardTitle>Базовый</CardTitle>
                    </div>
                    <div className="text-xs text-blue-400 px-2.5 py-1 rounded-full bg-blue-500/10">
                      Эконом
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-2xl font-bold">799 ₽</span>
                    <span className="text-sm font-normal text-muted-foreground ml-1.5">/мес</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Клиенты</span>
                      <span className="font-medium">2450 из 5000</span>
                    </div>
                    <div className="w-full h-1.5 bg-blue-900/30 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full" style={{ width: '49%' }}></div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 py-2">
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-blue-500/20 text-blue-400 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">Трекинг питания</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-blue-500/20 text-blue-400 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">Персональные советы</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-zinc-700/50 text-zinc-500 mt-0.5">
                        <XIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm text-muted-foreground">Рецепты любых блюд</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-zinc-700/50 text-zinc-500 mt-0.5">
                        <XIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm text-muted-foreground">Программы тренировок</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-2 pb-4">
                  <Button variant="outline" className="w-full gap-1.5 border-blue-800/50 hover:bg-blue-800/20 group">
                    Редактировать <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
            
            {/* Premium Plan - Redesigned with more modern style */}
            <Card className="bg-zinc-900 border-2 border-emerald-800/50 overflow-hidden relative shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/50 to-transparent opacity-70 pointer-events-none"></div>
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs py-1.5 px-3 font-medium rounded-bl-lg">
                  Популярный
                </div>
              </div>
              <div className="relative z-10">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/20 p-2.5 rounded-full">
                      <Bot className="h-5 w-5 text-emerald-400" />
                    </div>
                    <CardTitle>Premium</CardTitle>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-2xl font-bold">1499 ₽</span>
                    <span className="text-sm font-normal text-muted-foreground ml-1.5">/мес</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Клиенты</span>
                      <span className="font-medium">1300 из 3000</span>
                    </div>
                    <div className="w-full h-1.5 bg-emerald-900/30 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full" style={{ width: '43%' }}></div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 py-2">
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-emerald-500/20 text-emerald-400 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">Трекинг питания</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-emerald-500/20 text-emerald-400 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">Персональные советы</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-emerald-500/20 text-emerald-400 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">Рецепты любых блюд</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-emerald-500/20 text-emerald-400 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">Программы тренировок</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-2 pb-4">
                  <Button className="w-full gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 group">
                    Редактировать <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="subscribers">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Активные подписки</CardTitle>
              <p className="text-sm text-muted-foreground">Информация о клиентах с активными подписками</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Клиент</TableHead>
                    <TableHead>План</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/avatars/${subscriber.id}.png`} alt={subscriber.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">{subscriber.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium leading-none mb-0.5">{subscriber.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <PlanBadge plan={subscriber.plan} />
                      </TableCell>
                      <TableCell>{subscriber.date}</TableCell>
                      <TableCell>
                        <StatusBadge status={subscriber.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button size="sm" className="btn-primary">
                Управление подписками
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
