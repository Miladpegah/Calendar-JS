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


export const showCalculation = (year, pastMonth) => {
  calendar.innerHTML = '';
  days = getDaysInMonthUTC(pastMonth, year);
  monthLong = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(Date.UTC(year, pastMonth, 1)));
  monthName.innerHTML = '';
  monthName.insertAdjacentHTML("beforeend",`<h1>${monthLong}<br/>${year}</h1>`);

  for (let day = 1; day <= days.length; day++){

    const weekend = isWeekend(day);
    const today = isToday(day);

    let name = '';

    if(day <= 7){
      const dayName = getDayName(year, pastMonth, day);
      name = `<div class="name">${dayName}</div>`
    }

    calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""} ${today ? "selected" : ""}">${name}${day}</div>`);
  }
}

export const calendarCalculator = (year, month) => {
  showCalculation(year, month);
}