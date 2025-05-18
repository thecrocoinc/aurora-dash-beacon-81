
import { LucideIcon, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface EmptyBannerProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyBanner({
  icon: Icon = UserPlus,
  title,
  subtitle,
  className,
  action,
}: EmptyBannerProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-muted/20",
      className
    )}>
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-medium">{title}</h3>
      {subtitle && (
        <p className="text-muted-foreground mt-2 max-w-sm">{subtitle}</p>
      )}
      {action && (
        <Button className="mt-6" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
