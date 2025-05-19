
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ArrowRight, CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BasicPlanCard() {
  return (
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
  );
}
