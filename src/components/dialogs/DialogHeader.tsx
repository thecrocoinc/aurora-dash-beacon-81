
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { ChangeEvent, useRef } from "react";

interface DialogHeaderProps {
  title: string;
  description: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const DialogHeader = ({ 
  title, 
  description, 
  searchQuery, 
  onSearchChange 
}: DialogHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-4 gap-4">
      <div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="mt-1">{description}</CardDescription>
      </div>
      <div className="relative w-[240px] md:w-[280px] transition-all duration-300">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          ref={searchInputRef}
          type="search"
          placeholder="Поиск диалогов..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-md border border-border/50 bg-background/30 py-2 pl-9 pr-9 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
          aria-label="Поиск диалогов"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground p-0.5"
            onClick={handleClearSearch}
            aria-label="Очистить поиск"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </CardHeader>
  );
};

export default DialogHeader;
