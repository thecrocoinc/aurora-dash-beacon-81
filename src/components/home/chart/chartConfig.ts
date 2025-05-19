
// Configuration for chart lines
export const chartConfig = {
  users: {
    label: "Пользователи",
    theme: { light: "#6366f1", dark: "#818cf8" }, // Улучшенный индиго цвет
  },
  active: {
    label: "Активные пользователи",
    theme: { light: "#10b981", dark: "#34d399" }, // Оставляем тот же зеленый цвет
  }
};

// Time period options
export const periodOptions = ["week", "month", "quarter", "year"];

// Period display names
export const periodLabels = {
  week: "Неделя",
  month: "Месяц",
  quarter: "Квартал",
  year: "Год"
};

export type PeriodType = keyof typeof periodLabels;
