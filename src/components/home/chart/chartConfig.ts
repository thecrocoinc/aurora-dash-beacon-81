
// Configuration for chart lines
export const chartConfig = {
  users: {
    label: "Пользователи",
    theme: { light: "#3B82F6", dark: "#60A5FA" }, // Синий цвет
  },
  active: {
    label: "Активные пользователи",
    theme: { light: "#FB923C", dark: "#FDBA74" }, // Теплый оранжевый цвет
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
