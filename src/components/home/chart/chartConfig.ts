
// Configuration for chart lines
export const chartConfig = {
  users: {
    label: "Пользователи",
    theme: { light: "#ff7e5f", dark: "#ffb347" }, // Теплый оранжево-красный цвет
  },
  active: {
    label: "Активные пользователи",
    theme: { light: "#feb47b", dark: "#ffcb80" }, // Теплый оранжево-желтый цвет
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
