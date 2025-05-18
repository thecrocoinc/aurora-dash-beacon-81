
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  iconClassName?: string;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12", className)}>
      <div className={cn("bg-muted/30 p-4 rounded-full mb-4", iconClassName)}>
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      {description && (
        <p className="text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
};

export default EmptyState;
