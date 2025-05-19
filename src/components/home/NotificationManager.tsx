import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell, Calendar, Users, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Имитация данных о запланированных рассылках
const scheduledNotifications = [{
  id: "1",
  title: "Напоминание о дневном отчете",
  scheduled: "Ежедневно, 20:00",
  recipients: "Все клиенты",
  status: "active"
}, {
  id: "2",
  title: "Еженедельный обзор прогресса",
  scheduled: "Воскресенье, 18:00",
  recipients: "Все клиенты",
  status: "active"
}, {
  id: "3",
  title: "Новые рецепты недели",
  scheduled: "Завтра, 9:00",
  recipients: "32 клиента",
  status: "scheduled"
}];

// Шаблоны сообщений для быстрого создания рассылок
const messageTemplates = [{
  id: "1",
  title: "Напоминание о фото приема пищи",
  content: "Добрый день! Не забудьте сделать фото вашего сегодняшнего приема пищи.",
  type: "reminder"
}, {
  id: "2",
  title: "Еженедельная мотивация",
  content: "Прошла еще одна неделя вашего пути к здоровому образу жизни! Продолжайте в том же духе!",
  type: "motivation"
}, {
  id: "3",
  title: "Анонс новых функций",
  content: "Мы добавили новые возможности в наше приложение! Проверьте обновления.",
  type: "announcement"
}];
export function NotificationManager() {
  return <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500/80 to-amber-700/80">
          <Bell className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Рассылки</h2>
      </div>
      <p className="text-muted-foreground">Управление массовыми уведомлениями и рассылками для клиентов</p>
      
      <div className="mt-4">
        <Tabs defaultValue="scheduled">
          <TabsList className="mb-4">
            <TabsTrigger value="scheduled">Запланированные</TabsTrigger>
            <TabsTrigger value="templates">Шаблоны</TabsTrigger>
            <TabsTrigger value="create">Создать новую</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled">
            <Card className="backdrop-blur bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Запланированные рассылки</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Фильтр" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все рассылки</SelectItem>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="scheduled">Запланированные</SelectItem>
                    <SelectItem value="completed">Завершенные</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledNotifications.map(notification => <div key={notification.id} className="flex items-center justify-between p-3 rounded-md bg-background/40 border border-muted">
                      <div className="flex items-center gap-3">
                        {notification.status === "active" ? <Bell className="h-5 w-5 text-blue-400" /> : <Calendar className="h-5 w-5 text-amber-400" />}
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{notification.scheduled}</span>
                            <span className="mx-2">•</span>
                            <span>{notification.recipients}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Редактировать</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Удалить</span>
                        </Button>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Шаблоны сообщений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messageTemplates.map(template => <div key={template.id} className="p-4 rounded-md border border-muted bg-background/40">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{template.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${template.type === "reminder" ? "bg-blue-100 text-blue-800" : template.type === "motivation" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                          {template.type === "reminder" ? "Напоминание" : template.type === "motivation" ? "Мотивация" : "Анонс"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{template.content}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Button size="sm" variant="outline">Использовать</Button>
                        <Button size="sm" variant="ghost">Редактировать</Button>
                      </div>
                    </div>)}
                  
                  <Button variant="outline" className="w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Создать новый шаблон
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Создать новую рассылку</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Название рассылки</label>
                    <input type="text" className="w-full p-2 border rounded-md bg-background" placeholder="Например: Важное обновление" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Получатели</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите получателей" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все клиенты</SelectItem>
                        <SelectItem value="active">Активные клиенты</SelectItem>
                        <SelectItem value="inactive">Неактивные клиенты</SelectItem>
                        <SelectItem value="custom">Выбрать вручную</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Содержание сообщения</label>
                    <textarea className="w-full p-2 border rounded-md bg-background h-32" placeholder="Текст сообщения для рассылки..." />
                  </div>
                  
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-1 block">Дата</label>
                      <input type="date" className="w-full p-2 border rounded-md bg-background" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-1 block">Время</label>
                      <input type="time" className="w-full p-2 border rounded-md bg-background" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <Button>Создать рассылку</Button>
                    <Button variant="outline">Отмена</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}