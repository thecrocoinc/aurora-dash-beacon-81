
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ArrowRight, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PremiumPlanCard() {
  return (
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
            <li className="flex items-start gap-2.5">
              <div className="rounded-full p-0.5 bg-emerald-500/20 text-emerald-400 mt-0.5">
                <CheckIcon className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm">Добавление умных устройств</span>
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
  );
}
