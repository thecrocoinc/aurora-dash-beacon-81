
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

interface DialogHeaderProps {
  title: string;
  description: string;
}

const DialogHeader = ({ title, description }: DialogHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
      <div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="relative w-[240px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input 
          type="search"
          placeholder="Поиск диалогов..."
          className="w-full rounded-md border border-white/10 bg-black/20 py-2 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      </div>
    </CardHeader>
  );
};

export default DialogHeader;
