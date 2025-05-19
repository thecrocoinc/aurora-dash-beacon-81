import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, AlertTriangle, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Имитация данных клиентов, требующих внимания
const clientsNeedingAttention = [{
  id: "1",
  name: "Ирина П.",
  avatar: null,
  issue: "Пропущено 3 дня отчетов",
  type: "missed_reports",
  lastActive: "3 дня назад"
}, {
  id: "2",
  name: "Алексей М.",
  avatar: null,
  issue: "Отклонение от плана питания",
  type: "diet_deviation",
  lastActive: "Сегодня"
}, {
  id: "3",
  name: "Светлана К.",
  avatar: null,
  issue: "Не достигает цели по белку",
  type: "nutrient_deficit",
  lastActive: "Вчера"
}, {
  id: "4",
  name: "Михаил Д.",
  avatar: null,
  issue: "Запрос консультации",
  type: "support_request",
  lastActive: "12 часов назад"
}];

// Имитация данных о прогрессе клиентов в целом
const progressMetrics = [{
  label: "Соблюдают план",
  value: 68,
  color: "emerald"
}, {
  label: "Требуют внимания",
  value: 23,
  color: "amber"
}, {
  label: "Критические",
  value: 9,
  color: "red"
}];
export function ClientDataMetrics() {
  return <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/80 to-purple-700/80">
          <Users className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Клиенты, требующие внимания</h2>
      </div>
      <p className="text-muted-foreground">Отслеживайте клиентов, которым может потребоваться ваша помощь</p>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>Требуют внимания</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientsNeedingAttention.map(client => <div key={client.id} className="flex items-center justify-between p-3 rounded-md bg-background/40 border border-muted hover:bg-background/70 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={client.avatar || undefined} alt={client.name} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <div className="flex items-center text-xs">
                          {client.type === "missed_reports" && <Calendar className="h-3 w-3 mr-1 text-red-400" />}
                          {client.type === "support_request" && <AlertTriangle className="h-3 w-3 mr-1 text-blue-400" />}
                          <span className="text-muted-foreground">{client.issue}</span>
                          <span className="mx-2">•</span>
                          <span>{client.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/profiles/${client.id}`}>
                      <Button size="sm" variant="outline">
                        Детали
                      </Button>
                    </Link>
                  </div>)}

                <Link to="/profiles" className="block w-full">
                  <Button variant="outline" className="w-full">
                    Все клиенты
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span>Общий прогресс</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mt-2">
                {progressMetrics.map(metric => <div key={metric.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{metric.label}</span>
                      <span className={`text-sm font-medium text-${metric.color}-500`}>{metric.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted/50 rounded-full">
                      <div className={`h-full rounded-full bg-${metric.color}-500`} style={{
                    width: `${metric.value}%`
                  }}></div>
                    </div>
                  </div>)}
                
                <div className="pt-4 border-t border-border/40">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span>Общее выполнение целей</span>
                    <span className="font-medium">76%</span>
                  </div>
                  <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-3/4 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}