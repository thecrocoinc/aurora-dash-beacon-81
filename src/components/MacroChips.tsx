
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
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
        P {protein ?? "—"} g
      </span>
      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
        F {fat ?? "—"} g
      </span>
      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
        C {carbs ?? "—"} g
      </span>
    </div>
  );
};

export default MacroChips;
