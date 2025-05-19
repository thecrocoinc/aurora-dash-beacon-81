
// Configuration for chart lines
export const chartConfig = {
  users: {
    label: "Пользователи",
    theme: { light: "#111", dark: "#333" }, // Темный цвет для пользователей
  },
  active: {
    label: "Активные пользователи",
    theme: { light: "#D4AF37", dark: "#F5D76E" }, // Золотой цвет для активных пользователей
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
