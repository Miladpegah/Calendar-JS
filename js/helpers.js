export const isWeekend = day => {
	// 6 when it's saturday, 0 when it's sunday
	return day % 7 === 6 || day % 7 === 0
}

export const isToday = day => {
  let now = new Date().getDate();
  return day === now;
}

export const getDayName = day => {
	const date = new Date(Date.UTC(2021, 9, day));

	const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

	return dayName;
}

export const getDaysInMonthUTC = (month, year) => {
  let date = new Date(Date.UTC(year, month, 1));
  let days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date).getDate());
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}