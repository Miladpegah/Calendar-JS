// import {isWeekend} from "./helpers.js";
// import {isToday} from "./helpers.js";
// import {getDayName} from "./helpers.js";
// import {getDaysInMonthUTC} from "./helpers.js";

const calendar = document.querySelector('#app-calendar');
const monthName = document.querySelector('#month-name');
const previous = document.querySelector('#previous');
const future = document.querySelector('#future');
let year = new Date().getFullYear();
let month = new Date().getMonth();
let monthLong = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(Date.UTC(year, month, 1)));

const isWeekend = day => {
	// 6 when it's saturday, 0 when it's sunday
	return day % 7 === 6 || day % 7 === 0
}

const isToday = day => {
	let now = new Date().getDate();
	return day === now;
}

const getDayName = (yearNum, monthNum, day) => {
	const date = new Date(Date.UTC(yearNum, monthNum, day));

	const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

	return dayName;
}

const getDaysInMonthUTC = (month, year) => {
  let date = new Date(Date.UTC(year, month, 1));
  let days = [];
  while (date.getUTCMonth() === month) {
    days.push(date.getDate());
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}

let days = getDaysInMonthUTC(month, year);


monthName.insertAdjacentHTML("beforeend",`<h1>${monthLong}</h1>`);

for (let day = 1; day <= days.length; day++){

	const weekend = isWeekend(day);
	const today = isToday(day);

	let name = '';

	if(day <= 7){
		const dayName = getDayName(year, month,day);
		name = `<div class="name">${dayName}</div>`
	}

	calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""} ${today ? "selected" : ""}">${name}${day}</div>`);
}

document.querySelectorAll('#app-calendar .day').forEach(day => {
	day.addEventListener("click", event => {
		event.currentTarget.classList.toggle("selected");
	});
});




const showCalculation = (year, pastMonth) => {
	calendar.innerHTML = '';
	days = getDaysInMonthUTC(pastMonth, year);
  monthLong = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(Date.UTC(year, pastMonth, 1)));
	monthName.innerHTML = '';
	monthName.insertAdjacentHTML("beforeend",`<h1>${monthLong}</h1>`);

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

const calendarCalculator = (year, month) => {
	showCalculation(year, month);
}

previous.addEventListener("click", () => {
	let totallMonth = month -= 1;
	let currentYear;
	if(totallMonth < 1){
		month = 12;
		totallMonth = 12;
		currentYear = year -= 1;
	}else{
		currentYear = year;
	}
	calendarCalculator(currentYear, totallMonth);
});


future.addEventListener("click", () => {
	let totallMonth = month += 1;
	let currentYear;
	if(totallMonth > 12){
		month = 1;
		totallMonth = 1;
		currentYear = year += 1;
	}else{
		currentYear = year;
	}
	calendarCalculator(currentYear, totallMonth);
});


console.log(new Date(Date.UTC(2021, 12, 1)));