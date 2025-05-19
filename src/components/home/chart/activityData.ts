
// Data for different time periods
export const activityData = {
  week: [
    { day: "Пн", users: 4820, active: 2240 },
    { day: "Вт", users: 4950, active: 2320 },
    { day: "Ср", users: 5120, active: 2450 },
    { day: "Чт", users: 5230, active: 2580 },
    { day: "Пт", users: 5430, active: 2780 },
    { day: "Сб", users: 5590, active: 2940 },
    { day: "Вс", users: 5710, active: 3120 },
  ],
  month: [
    { day: "1 Май", users: 4200, active: 2050 },
    { day: "8 Май", users: 4680, active: 2260 },
    { day: "15 Май", users: 5230, active: 2670 },
    { day: "20 Май", users: 5710, active: 3120 },
  ],
  quarter: [
    { day: "Март", users: 3850, active: 1680 },
    { day: "Апрель", users: 4680, active: 2280 },
    { day: "Май", users: 5710, active: 3120 },
  ],
  year: [
    { day: "Янв", users: 2860, active: 1240 },
    { day: "Фев", users: 3520, active: 1560 },
    { day: "Мар", users: 3850, active: 1680 },
    { day: "Апр", users: 4680, active: 2280 },
    { day: "Май", users: 5710, active: 3120 },
    { day: "Июн", users: 6420, active: 3740 },
  ],
};

// Get summary data based on selected period
export const getSummaryData = (period: keyof typeof activityData) => {
  const stats = {
    week: { users: "5710", active: "3120", growth: "+18%", activeRate: "54%" },
    month: { users: "5710", active: "3120", growth: "+36%", activeRate: "54%" },
    quarter: { users: "5710", active: "3120", growth: "+48%", activeRate: "54%" },
    year: { users: "6420", active: "3740", growth: "+125%", activeRate: "58%" },
  };
  
  return stats[period];
};
