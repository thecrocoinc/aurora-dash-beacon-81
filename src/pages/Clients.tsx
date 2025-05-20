
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useClientsData } from "@/hooks/useClientsData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { EmptyBanner } from "@/components/EmptyBanner";

const Clients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { clients, isLoading, error } = useClientsData();

  // Filter clients based on search query
  const filteredClients = clients?.filter(client => {
    const username = client.username?.toLowerCase() || "";
    const firstName = client.first_name?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    
    return username.includes(query) || firstName.includes(query);
  });

  // Handle row click - navigate to client detail page
  const handleRowClick = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  // Generate avatar initials from name
  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
          <p className="text-muted-foreground mt-1">
            Загрузка данных...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
          <p className="text-red-500 mt-1">
            Ошибка загрузки данных
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Клиенты</h1>
        <p className="text-muted-foreground mt-1">
          Управление профилями клиентов и их данными
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Поиск по имени или username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {filteredClients && filteredClients.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Клиент</TableHead>
                    <TableHead>Telegram ID</TableHead>
                    <TableHead className="text-right">Дата регистрации</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow 
                      key={client.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(client.id)}
                    >
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(client.first_name || client.username)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.first_name || "Без имени"}</div>
                          {client.username && (
                            <div className="text-xs text-muted-foreground">@{client.username}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{client.telegram_id}</TableCell>
                      <TableCell className="text-right">
                        {client.created_at ? 
                          format(new Date(client.created_at), 'dd.MM.yyyy') : 
                          'Неизвестно'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyBanner
              title="Клиенты не найдены"
              subtitle={searchQuery ? "Попробуйте изменить параметры поиска" : "В системе нет зарегистрированных клиентов"}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
