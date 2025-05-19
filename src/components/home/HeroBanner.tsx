
import React from "react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="hero overflow-hidden relative shadow bg-emerald-950">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-emerald-end)]/30 to-[var(--color-surface)]/70 z-[-1]"></div>
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 premium-text">Панель управления AI-Nutrition</h1>
        <p className="text-lg md:text-xl mb-6 text-[var(--color-text-muted)] text-zinc-200">
          Управляйте вашим AI-ботом для трекинга питания и здоровья, анализируйте данные клиентов и развивайте свой бизнес
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="btn-primary rounded-[var(--radius)]">Обзор возможностей</Button>
          <Button variant="outline" className="border-[var(--color-emerald-start)]/40 text-[var(--color-emerald-start)] hover:bg-[var(--color-emerald-muted)] hover:text-[var(--color-emerald-start)] rounded-[var(--radius)]">
            Техподдержка
          </Button>
        </div>
      </div>
    </div>
  );
}
