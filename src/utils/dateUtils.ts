
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
    // Используем более читаемый формат даты для истории сообщений
    return format(date, "dd.MM");
  }
};
