
// Data for different time periods
export const activityData = {
  week: [
    { day: "Пн", users: 3200, active: 1280 },
    { day: "Вт", users: 3280, active: 1320 },
    { day: "Ср", users: 3340, active: 1390 },
    { day: "Чт", users: 3420, active: 1430 },
    { day: "Пт", users: 3540, active: 1520 },
    { day: "Сб", users: 3610, active: 1550 },
    { day: "Вс", users: 3680, active: 1620 },
  ],
  month: [
    { day: "1 Май", users: 2800, active: 1150 },
    { day: "8 Май", users: 3100, active: 1260 },
    { day: "15 Май", users: 3380, active: 1360 },
    { day: "22 Май", users: 3510, active: 1440 },
    { day: "29 Май", users: 3680, active: 1620 },
  ],
  quarter: [
    { day: "Март", users: 2500, active: 980 },
    { day: "Апрель", users: 3200, active: 1280 },
    { day: "Май", users: 3680, active: 1620 },
  ],
  year: [
    { day: "Янв", users: 1860, active: 680 },
    { day: "Фев", users: 2200, active: 840 },
    { day: "Мар", users: 2500, active: 980 },
    { day: "Апр", users: 3200, active: 1280 },
    { day: "Май", users: 3680, active: 1620 },
    { day: "Июн", users: 4120, active: 1840 },
  ],
};

// Get summary data based on selected period
export const getSummaryData = (period: keyof typeof activityData) => {
  const stats = {
    week: { users: "3680", active: "1620", growth: "+14%", activeRate: "44%" },
    month: { users: "3680", active: "1620", growth: "+31%", activeRate: "44%" },
    quarter: { users: "3680", active: "1620", growth: "+47%", activeRate: "44%" },
    year: { users: "4120", active: "1840", growth: "+122%", activeRate: "45%" },
  };
  
  return stats[period];
};
