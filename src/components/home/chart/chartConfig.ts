

// Configuration for chart lines
export const chartConfig = {
  users: {
    label: "Пользователи",
    theme: { light: "#26282E", dark: "#26282E" }, // Using color_surface_muted from design tokens
  },
  active: {
    label: "Активные пользователи",
    theme: { light: "#CE9F49", dark: "#F4C978" }, // Using primary start and end from design tokens
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

