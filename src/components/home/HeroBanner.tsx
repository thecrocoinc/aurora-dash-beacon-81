
import React from "react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="hero overflow-hidden relative shadow-lg bg-emerald-950 rounded-[12px] p-8">
      <div className="emerald-overlay"></div>
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Панель управления AI-Nutrition
        </h1>
        <p className="text-lg md:text-xl mb-6 text-foreground">
          Управляйте вашим AI-ботом для трекинга питания и здоровья, анализируйте данные клиентов и развивайте свой бизнес
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="btn-primary rounded-[var(--radius)] bg-primary hover:bg-primary/90 transition-all hover:scale-105">
            Обзор возможностей
          </Button>
          <Button 
            variant="outline" 
            className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary hover:text-primary transition-all rounded-[var(--radius)]"
          >
            Техподдержка
          </Button>
        </div>
      </div>
    </div>
  );
}
