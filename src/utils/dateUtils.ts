
import { format } from "date-fns";

/**
 * Formats a timestamp based on whether it's today or a previous date
 * @param date Date to format
 * @returns Formatted time string (HH:mm for today, dd.MM for other dates)
 */
export const formatTime = (date: Date): string => {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  
  // Using colon format for time
  return isToday ? format(date, "HH:mm") : format(date, "dd.MM");
};
