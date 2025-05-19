
import React from "react";
import { Button } from "@/components/ui/button";
export function HeroBanner() {
  return <div className="hero overflow-hidden relative shadow-lg bg-[#01261F] rounded-[12px] p-8">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-muted)] to-[var(--color-surface)] opacity-50 z-[-1]"></div>
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary-0)]">Панель управления AI-Nutrition</h1>
        <p className="text-lg md:text-xl mb-6 text-[var(--color-text)]">
          Управляйте вашим AI-ботом для трекинга питания и здоровья, анализируйте данные клиентов и развивайте свой бизнес
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="btn-primary rounded-[var(--radius)]">Обзор возможностей</Button>
          <Button variant="ghost" className="btn-secondary rounded-[var(--radius)]">Техподдержка</Button>
        </div>
      </div>
    </div>;
}
