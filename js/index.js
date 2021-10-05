// import {isWeekend} from "./helpers.js";
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

const getDayName = day => {
	const date = new Date(Date.UTC(2021, 9, day));

	const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

	return dayName;
}

const getDaysInMonthUTC = (month, year) => {
  let date = new Date(Date.UTC(year, month, 1));
  let days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date).getDate());
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}

let days = getDaysInMonthUTC(month, year);


monthName.insertAdjacentHTML("beforeend",`<h1>${monthLong}</h1>`);

for (let day = 1; day <= days.length; day++){

	const weekend = isWeekend(day);

	let name = '';

	if(day <= 7){
		const dayName = getDayName(day);
		name = `<div class="name">${dayName}</div>`
	}

	calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}">${name}${day}</div>`);
}

document.querySelectorAll('#app-calendar .day').forEach(day => {
	day.addEventListener("click", event => {
		event.currentTarget.classList.toggle("selected");
	});
});

