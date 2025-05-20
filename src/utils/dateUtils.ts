
import { format } from "date-fns";

/**
 * Форматирует временную метку в зависимости от того, сегодня она или предыдущая дата
 * @param date Дата для форматирования
 * @returns Отформатированная строка времени (HH:mm для сегодня, dd.MM для других дат)
 */
export const formatTime = (date: Date): string => {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  if (isToday) {
    return format(date, "HH:mm");
  } else if (isYesterday) {
    return "Вчера";
  } else {
    const thisYear = today.getFullYear() === date.getFullYear();
    // Возвращаем день и месяц для дат этого года, полную дату для других лет
    return thisYear ? format(date, "d MMM") : format(date, "dd.MM.yy");
  }
};
