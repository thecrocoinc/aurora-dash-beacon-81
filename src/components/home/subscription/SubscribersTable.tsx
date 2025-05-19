
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlanBadge } from "./PlanBadge";

// Data type for subscribers
interface Subscriber {
  id: number;
  name: string;
  avatar: string;
  plan: string;
  date: string;
}

export function SubscribersTable() {
  // Enhanced data for active subscribers
  const recentSubscribers: Subscriber[] = [
    { 
      id: 1, 
      name: "Анна М.", 
      avatar: "A",
      plan: "Premium", 
      date: "20 Мая"
    },
    { 
      id: 2, 
      name: "Сергей К.", 
      avatar: "С",
      plan: "Basic", 
      date: "20 Мая"
    },
    { 
      id: 3, 
      name: "Ирина Л.", 
      avatar: "И",
      plan: "Premium", 
      date: "20 Мая"
    },
    { 
      id: 4, 
      name: "Павел В.", 
      avatar: "П",
      plan: "Basic", 
      date: "20 Мая"
    },
  ];

  return (
    <Card className="shadow-md border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      <CardHeader className="pb-2 border-b border-zinc-800">
        <CardTitle className="text-lg">Активные подписки</CardTitle>
        <p className="text-sm text-muted-foreground">Информация о клиентах с активными подписками</p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-800/50">
              <TableHead className="text-zinc-400 font-medium">Клиент</TableHead>
              <TableHead className="text-zinc-400 font-medium">План</TableHead>
              <TableHead className="text-zinc-400 font-medium">Дата</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id} className="hover:bg-zinc-800/30 border-b border-zinc-800">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-zinc-700">
                      <AvatarImage src={`/avatars/${subscriber.id}.png`} alt={subscriber.name} />
                      <AvatarFallback className="bg-zinc-800 text-zinc-300">{subscriber.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium leading-none mb-0.5">{subscriber.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <PlanBadge plan={subscriber.plan} />
                </TableCell>
                <TableCell className="text-zinc-400">{subscriber.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end border-t border-zinc-800 py-3">
        <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600">
          Управление подписками
        </Button>
      </CardFooter>
    </Card>
  );
}
