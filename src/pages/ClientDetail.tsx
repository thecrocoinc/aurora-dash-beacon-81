
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientDetail } from "@/hooks/useClientDetail";
import MacroChips from "@/components/MacroChips";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const { 
    profile, 
    digest, 
    meals, 
    mealDrafts, 
    isLoading, 
    error 
  } = useClientDetail(id, selectedDate);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Детали клиента</h1>
          <Button variant="outline" onClick={() => navigate('/clients')}>
            Назад к списку
          </Button>
        </div>
        <div className="text-red-500">
          Произошла ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
        </div>
      </div>
    );
  }

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {isLoading ? <Skeleton className="h-9 w-32" /> : profile?.first_name || 'Клиент'}
        </h1>
        <Button variant="outline" onClick={() => navigate('/clients')}>
          Назад к списку
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-muted-foreground">
          Данные за {format(selectedDate, 'dd.MM.yyyy')}
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto"
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Выбрать дату
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Профиль</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            ) : profile ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {getInitials(profile.first_name || profile.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-lg">{profile.first_name || "Без имени"}</div>
                    {profile.username && <div className="text-muted-foreground">@{profile.username}</div>}
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telegram ID:</span>
                    <span className="font-medium">{profile.telegram_id}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-muted-foreground">Дата регистрации:</span>
                    <span>
                      {profile.created_at ? 
                        format(new Date(profile.created_at), 'dd.MM.yyyy') : 
                        'Неизвестно'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">Профиль не найден</div>
            )}
          </CardContent>
        </Card>

        {/* Macros Card */}
        <Card>
          <CardHeader>
            <CardTitle>Макронутриенты</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ) : digest ? (
              <div className="space-y-4">
                <div className="text-3xl font-bold">{digest.kcal || 0} ккал</div>
                <MacroChips
                  protein={digest.prot}
                  fat={digest.fat}
                  carbs={digest.carb}
                />
              </div>
            ) : (
              <div className="text-muted-foreground">
                Нет данных за выбранную дату
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photos Card */}
        <Card>
          <CardHeader>
            <CardTitle>Фотографии за день</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square h-24" />
                ))}
              </div>
            ) : mealDrafts && mealDrafts.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {mealDrafts.map((draft) => (
                  <div 
                    key={draft.id} 
                    className="aspect-square rounded-md bg-muted/30 flex items-center justify-center text-muted-foreground"
                  >
                    {draft.photo_file_id ? (
                      <div className="w-full h-full rounded overflow-hidden">
                        {/* Note: You would need to get the actual photo URL from Telegram API */}
                        <div className="text-xs p-2 text-center">Фото ID: {draft.photo_file_id.substring(0, 8)}...</div>
                      </div>
                    ) : (
                      <span className="text-xs">Нет фото</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                Нет фотографий за выбранную дату
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Meals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Приемы пищи</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : meals && meals.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Время</TableHead>
                    <TableHead>Блюдо</TableHead>
                    <TableHead className="text-right">Граммы</TableHead>
                    <TableHead className="text-right">Ккал</TableHead>
                    <TableHead className="text-right">Макро</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meals.map((meal) => (
                    <TableRow key={meal.id}>
                      <TableCell className="font-medium">
                        {format(new Date(meal.eaten_at), 'HH:mm')}
                      </TableCell>
                      <TableCell>{meal.dish}</TableCell>
                      <TableCell className="text-right">{meal.grams} г</TableCell>
                      <TableCell className="text-right">{meal.kcal || 0} ккал</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <MacroChips
                            protein={meal.prot}
                            fat={meal.fat}
                            carbs={meal.carb}
                            className="justify-end"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-6">
              Нет записей о приемах пищи за выбранную дату
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetail;
