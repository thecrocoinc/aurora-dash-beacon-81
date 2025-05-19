
import React from "react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="rounded-3xl glass-morphism p-8 md:p-10 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-warm/70 z-[-1]"></div>
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Панель управления AI-Nutrition</h1>
        <p className="text-lg md:text-xl mb-6 text-blue-50">
          Управляйте вашим AI-ботом для трекинга питания и здоровья, анализируйте данные клиентов и развивайте свой бизнес
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-white/20 hover:bg-white/30 backdrop-blur">Обзор возможностей</Button>
          <Button variant="ghost" className="bg-warm/20 hover:bg-warm/30 text-white">Техподдержка</Button>
        </div>
      </div>
    </div>
  );
}
