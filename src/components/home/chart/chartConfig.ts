
// Configuration for chart lines
export const chartConfig = {
  users: {
    label: "Скоро заплатят",
    theme: { light: "#26282E", dark: "#26282E" }, // Using color_surface_muted from design tokens
  },
  active: {
    label: "Платящие клиенты",
    theme: { light: "#05866D", dark: "#059682" }, // Using emerald colors
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
