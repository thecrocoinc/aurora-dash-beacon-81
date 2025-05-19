
// Configuration for chart lines
export const chartConfig = {
  users: {
    label: "Пользователи",
    theme: { light: "#3B82F6", dark: "#60A5FA" }, // Bright blue - more energetic and fresh
  },
  active: {
    label: "Активные пользователи",
    theme: { light: "#10B981", dark: "#34D399" }, // Vibrant green - represents health and wellness
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
