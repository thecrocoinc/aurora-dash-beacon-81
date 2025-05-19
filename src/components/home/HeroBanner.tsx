
import React from "react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="rounded-3xl glass-morphism p-8 md:p-10 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gold/30 z-[-1]"></div>
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 premium-text">Панель управления AI-Nutrition</h1>
        <p className="text-lg md:text-xl mb-6 text-gray-200">
          Управляйте вашим AI-ботом для трекинга питания и здоровья, анализируйте данные клиентов и развивайте свой бизнес
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gold hover:bg-gold-accent text-black">Обзор возможностей</Button>
          <Button variant="ghost" className="bg-black/20 hover:bg-black/30 text-white border border-gold/20">Техподдержка</Button>
        </div>
      </div>
    </div>
  );
}
