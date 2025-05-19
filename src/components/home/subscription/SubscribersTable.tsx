
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { PlanBadge } from "./PlanBadge";

// Data type for subscribers
interface Subscriber {
  id: number;
  name: string;
  avatar: string;
  plan: string;
  date: string;
  status: "active" | "trial" | "pending" | string;
}

export function SubscribersTable() {
  // Enhanced data for active subscribers
  const recentSubscribers: Subscriber[] = [
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

  return (
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
  );
}
