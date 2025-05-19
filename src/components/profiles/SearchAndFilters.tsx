
import React from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

const SearchAndFilters = ({ 
  searchQuery, 
  setSearchQuery,
  activeFilter,
  setActiveFilter
}: SearchAndFiltersProps) => {
  // Filter labels for display
  const filterLabels: Record<string, string> = {
    'active': 'Активная подписка',
    'trial': 'Пробный период',
    'expired': 'Истекшая подписка',
    'weight_loss': 'Снижение веса',
    'weight_gain': 'Набор массы',
    'maintenance': 'Поддержание формы'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск клиентов..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Фильтры
              {activeFilter && <span className="ml-1 h-2 w-2 rounded-full bg-primary"></span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Фильтровать по</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className={!activeFilter ? "bg-accent text-accent-foreground" : ""}
              onClick={() => setActiveFilter(null)}
            >
              Все клиенты
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeFilter === "active" ? "bg-accent text-accent-foreground" : ""}
              onClick={() => setActiveFilter("active")}
            >
              Активная подписка
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeFilter === "trial" ? "bg-accent text-accent-foreground" : ""}
              onClick={() => setActiveFilter("trial")}
            >
              Пробный период
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeFilter === "expired" ? "bg-accent text-accent-foreground" : ""}
              onClick={() => setActiveFilter("expired")}
            >
              Истекшая подписка
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className={activeFilter === "weight_loss" ? "bg-accent text-accent-foreground" : ""}
              onClick={() => setActiveFilter("weight_loss")}
            >
              Снижение веса
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeFilter === "weight_gain" ? "bg-accent text-accent-foreground" : ""}
              onClick={() => setActiveFilter("weight_gain")}
            >
              Набор массы
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={activeFilter === "maintenance" ? "bg-accent text-accent-foreground" : ""}
              onClick={() => setActiveFilter("maintenance")}
            >
              Поддержание формы
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active filter badge */}
      {activeFilter && (
        <div className="flex gap-2">
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1 px-3 py-1 text-xs"
          >
            {filterLabels[activeFilter]}
            <button 
              className="ml-1 rounded-full hover:bg-accent p-0.5"
              onClick={() => setActiveFilter(null)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </Badge>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
