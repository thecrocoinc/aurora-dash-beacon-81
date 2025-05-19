
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Database, Bot, Users, ArrowRight, CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function SubscriptionManagement() {
  // Sample data for active subscribers
  const recentSubscribers = [
    { id: 1, name: "Анна М.", plan: "Premium", date: "15 Мая", status: "active" },
    { id: 2, name: "Сергей К.", plan: "Basic", date: "13 Мая", status: "active" },
    { id: 3, name: "Ирина Л.", plan: "Premium", date: "10 Мая", status: "trial" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/80 to-blue-700/80">
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
            {/* Basic Plan - Redesigned */}
            <Card className="bg-zinc-900 border border-zinc-800 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-transparent opacity-70 pointer-events-none"></div>
              <div className="relative z-10">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <Bot className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle>Базовый</CardTitle>
                  </div>
                  <div className="text-2xl font-bold mt-2">799 ₽<span className="text-sm font-normal text-muted-foreground">/мес</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Клиенты</span>
                      <span className="font-medium">15 из 30</span>
                    </div>
                    <div className="w-full h-1.5 bg-blue-900/30 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 py-2">
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-blue-500/20 text-blue-500 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">Трекинг питания</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-blue-500/20 text-blue-500 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">Базовая аналитика</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-zinc-700/50 text-zinc-500 mt-0.5">
                        <XIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm text-muted-foreground">AI рекомендации</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-2 pb-4">
                  <Button variant="outline" className="w-full gap-1.5 border-blue-800/50 hover:bg-blue-800/20">
                    Подробнее <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
            
            {/* Premium Plan - Redesigned */}
            <Card className="bg-zinc-900 border-2 border-emerald-800/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-transparent opacity-70 pointer-events-none"></div>
              <div className="absolute top-0 right-0">
                <div className="bg-emerald-600 text-white text-xs py-1 px-3 font-medium rounded-bl-lg">
                  Популярный
                </div>
              </div>
              <div className="relative z-10">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="bg-emerald-500/20 p-2 rounded-full">
                      <Bot className="h-5 w-5 text-emerald-400" />
                    </div>
                    <CardTitle>Premium</CardTitle>
                  </div>
                  <div className="text-2xl font-bold mt-2">1499 ₽<span className="text-sm font-normal text-muted-foreground">/мес</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Клиенты</span>
                      <span className="font-medium">12 из 16</span>
                    </div>
                    <div className="w-full h-1.5 bg-emerald-900/30 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }}></div>
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
                      <span className="text-sm">Расширенная аналитика</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-emerald-500/20 text-emerald-400 mt-0.5">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">AI рекомендации</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-2 pb-4">
                  <Button className="w-full gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600">
                    Подробнее <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Недавние подписки</CardTitle>
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
                      <TableCell>{subscriber.name}</TableCell>
                      <TableCell>{subscriber.plan}</TableCell>
                      <TableCell>{subscriber.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          subscriber.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {subscriber.status === 'active' ? 'Активна' : 'Пробный период'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline" size="sm">
                Показать всех подписчиков
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
