
// Data for different time periods
export const activityData = {
  week: [
    { day: "Пн", users: 32, active: 28 },
    { day: "Вт", users: 35, active: 30 },
    { day: "Ср", users: 38, active: 29 },
    { day: "Чт", users: 40, active: 32 },
    { day: "Пт", users: 42, active: 36 },
    { day: "Сб", users: 35, active: 28 },
    { day: "Вс", users: 30, active: 24 },
  ],
  month: [
    { day: "1 Май", users: 28, active: 22 },
    { day: "8 Май", users: 32, active: 26 },
    { day: "15 Май", users: 38, active: 30 },
    { day: "22 Май", users: 41, active: 34 },
    { day: "29 Май", users: 45, active: 38 },
  ],
  quarter: [
    { day: "Март", users: 25, active: 20 },
    { day: "Апрель", users: 32, active: 26 },
    { day: "Май", users: 42, active: 35 },
  ],
  year: [
    { day: "Янв", users: 20, active: 15 },
    { day: "Фев", users: 22, active: 17 },
    { day: "Мар", users: 25, active: 20 },
    { day: "Апр", users: 32, active: 26 },
    { day: "Май", users: 42, active: 35 },
    { day: "Июн", users: 48, active: 40 },
  ],
};

// Get summary data based on selected period
export const getSummaryData = (period: keyof typeof activityData) => {
  const stats = {
    week: { users: "42", active: "36", growth: "+12%", activeRate: "85%" },
    month: { users: "45", active: "38", growth: "+18%", activeRate: "84%" },
    quarter: { users: "42", active: "35", growth: "+26%", activeRate: "83%" },
    year: { users: "48", active: "40", growth: "+32%", activeRate: "83%" },
  };
  
  return stats[period];
};
