
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { ru } from "date-fns/locale";

// Sample data for charts
const revenueData = [
  { date: "2023-05-10", revenue: 124000 },
  { date: "2023-05-11", revenue: 136500 },
  { date: "2023-05-12", revenue: 128700 },
  { date: "2023-05-13", revenue: 142300 },
  { date: "2023-05-14", revenue: 130500 },
  { date: "2023-05-15", revenue: 156000 },
  { date: "2023-05-16", revenue: 168200 },
  { date: "2023-05-17", revenue: 172100 },
  { date: "2023-05-18", revenue: 184300 },
  { date: "2023-05-19", revenue: 192500 },
];

const userAcquisitionData = [
  { name: "Поисковые системы", value: 45 },
  { name: "Социальные сети", value: 30 },
  { name: "Прямые ссылки", value: 15 },
  { name: "Партнёрская сеть", value: 10 },
];

const activeUsersData = [
  { date: "Пн", users: 120 },
  { date: "Вт", users: 140 },
  { date: "Ср", users: 135 },
  { date: "Чт", users: 155 },
  { date: "Пт", users: 180 },
  { date: "Сб", users: 150 },
  { date: "Вс", users: 130 },
];

const retentionData = [
  { week: "Неделя 1", retention: 100 },
  { week: "Неделя 2", retention: 85 },
  { week: "Неделя 3", retention: 70 },
  { week: "Неделя 4", retention: 62 },
  { week: "Неделя 5", retention: 55 },
  { week: "Неделя 6", retention: 50 },
  { week: "Неделя 7", retention: 48 },
  { week: "Неделя 8", retention: 45 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

const config = {
  revenue: {
    label: "Выручка",
    theme: { light: "#8884d8", dark: "#a78bfa" },
  },
  users: {
    label: "Пользователи",
    theme: { light: "#4ade80", dark: "#86efac" },
  },
  retention: {
    label: "Удержание",
    theme: { light: "#f97316", dark: "#fb923c" },
  },
};

const BizAgent = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Бизнес-аналитика</h1>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-between w-[240px]"
              >
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP", { locale: ru })
                  ) : (
                    <span>Выберите дату</span>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ru}
              />
            </PopoverContent>
          </Popover>
          
          <Button>Экспорт</Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="revenue">Выручка</TabsTrigger>
          <TabsTrigger value="retention">Удержание</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revenue Chart */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Выручка</CardTitle>
                <CardDescription>
                  Динамика выручки за последние 10 дней
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer config={config}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={revenueData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return format(date, "d MMM", { locale: ru });
                          }}
                        />
                        <YAxis 
                          tickFormatter={(value) => {
                            return `${value / 1000}k`;
                          }}
                        />
                        <Tooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value) => [`${value} ₽`, "Выручка"]}
                          labelFormatter={(label) => format(new Date(label), "d MMMM", { locale: ru })}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          fill="url(#revenueGradient)" 
                          stroke="var(--color-revenue)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* User Acquisition */}
            <Card>
              <CardHeader>
                <CardTitle>Источники привлечения</CardTitle>
                <CardDescription>
                  Распределение пользователей по каналам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userAcquisitionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userAcquisitionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" />
                      <Tooltip formatter={(value) => [`${value}%`, "Доля"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Active Users */}
            <Card>
              <CardHeader>
                <CardTitle>Активные пользователи</CardTitle>
                <CardDescription>
                  Количество активных пользователей по дням
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartContainer config={config}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={activeUsersData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="users" 
                          fill="var(--color-users)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Детализация пользователей</CardTitle>
              <CardDescription>
                Расширенная аналитика по пользовательской базе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Расширенная аналитика по пользователям будет доступна в следующем обновлении
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Финансовая аналитика</CardTitle>
              <CardDescription>
                Подробный отчет по финансовым показателям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Расширенная финансовая аналитика будет доступна в следующем обновлении
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Удержание пользователей</CardTitle>
              <CardDescription>
                График удержания пользователей по неделям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer config={config}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={retentionData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="retention" 
                        stroke="var(--color-retention)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BizAgent;
