
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
      <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
        Б {protein ?? "—"} г
      </span>
      <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded">
        Ж {fat ?? "—"} г
      </span>
      <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">
        У {carbs ?? "—"} г
      </span>
    </div>
  );
};

export default MacroChips;
