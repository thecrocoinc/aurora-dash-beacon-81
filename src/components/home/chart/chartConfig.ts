
// Configuration for chart lines
export const chartConfig = {
  users: {
    label: "Пользователи",
    theme: { light: "#4ade80", dark: "#86efac" }, // Зеленый цвет для здоровья
  },
  active: {
    label: "Активные пользователи",
    theme: { light: "#fb923c", dark: "#fdba74" }, // Теплый оранжевый цвет
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
