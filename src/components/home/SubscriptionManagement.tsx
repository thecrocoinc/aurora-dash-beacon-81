
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Database, Bot, Users, ArrowRight } from "lucide-react";
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
            {/* Basic Plan */}
            <Card className="bg-card/70 backdrop-blur border relative overflow-hidden">
              <CardHeader className="pt-6 pb-4">
                <div className="rounded-full p-3 bg-blue-500/20 mb-3 w-fit">
                  <Bot className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle>Базовый</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <p className="text-sm">15 активных пользователей</p>
                  </div>
                  <div className="w-full bg-muted/50 h-2.5 rounded-full">
                    <div className="bg-blue-500 h-full w-1/2 rounded-full"></div>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-600 text-xs">✓</span>
                    </div>
                    <span>Трекинг питания</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-600 text-xs">✓</span>
                    </div>
                    <span>Базовая аналитика</span>
                  </li>
                  <li className="flex items-center gap-2 opacity-50">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-100">
                      <span className="text-gray-400 text-xs">×</span>
                    </div>
                    <span>AI рекомендации</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <p className="font-medium">799 ₽/мес</p>
                <Button size="sm" variant="outline" className="gap-1">
                  Подробнее <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className="bg-card/70 backdrop-blur border-primary/30 border-2 relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-bl-lg">
                  Популярный
                </div>
              </div>
              <CardHeader className="pt-6 pb-4">
                <div className="rounded-full p-3 bg-emerald-500/20 mb-3 w-fit">
                  <Bot className="h-6 w-6 text-emerald-400" />
                </div>
                <CardTitle>Premium</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm">12 активных пользователей</p>
                  </div>
                  <div className="w-full bg-muted/50 h-2.5 rounded-full">
                    <div className="bg-emerald-500 h-full w-3/4 rounded-full"></div>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-emerald-100">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <span>Трекинг питания</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-emerald-100">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <span>Расширенная аналитика</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-emerald-100">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <span>AI рекомендации</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <p className="font-medium">1499 ₽/мес</p>
                <Button size="sm" className="gap-1">
                  Подробнее <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
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
