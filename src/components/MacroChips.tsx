
import React from "react";

type MacroChipsProps = {
  protein?: number | null;
  fat?: number | null;
  carbs?: number | null;
  className?: string;
};

const MacroChips = ({ protein, fat, carbs, className }: MacroChipsProps) => {
  return (
    <div className={`flex gap-2 ${className || ""}`}>
      <span className="text-xs bg-[rgba(255,255,255,0.1)] text-white px-2 py-1 rounded">
        P {protein ?? "—"} g
      </span>
      <span className="text-xs bg-[rgba(255,255,255,0.1)] text-white px-2 py-1 rounded">
        F {fat ?? "—"} g
      </span>
      <span className="text-xs bg-[rgba(255,255,255,0.1)] text-white px-2 py-1 rounded">
        C {carbs ?? "—"} g
      </span>
    </div>
  );
};

export default MacroChips;
