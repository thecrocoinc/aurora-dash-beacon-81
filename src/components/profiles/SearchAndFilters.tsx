
import React from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
}

const SearchAndFilters = ({ searchQuery, setSearchQuery }: SearchAndFiltersProps) => {
  return (
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
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Фильтры
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Фильтровать по</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Все клиенты</DropdownMenuItem>
          <DropdownMenuItem>Активная подписка</DropdownMenuItem>
          <DropdownMenuItem>Пробный период</DropdownMenuItem>
          <DropdownMenuItem>Истекшая подписка</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Снижение веса</DropdownMenuItem>
          <DropdownMenuItem>Набор массы</DropdownMenuItem>
          <DropdownMenuItem>Поддержание формы</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchAndFilters;
