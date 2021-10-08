// import {isWeekend} from "./helpers.js";
// import {isToday} from "./helpers.js";
// import {getDayName} from "./helpers.js";
// import {getDaysInMonthUTC} from "./helpers.js";
// import {showCalculation} from "./helpers.js";
// import {calendarCalculator} from "./helpers.js";

const calendar = document.querySelector('#app-calendar');
const monthName = document.querySelector('#month-name');
const previous = document.querySelector('#previous');
const future = document.querySelector('#future');
let year = new Date().getFullYear();
let month = new Date().getMonth();
let monthLong = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(Date.UTC(year, month, 1)));

const isWeekend = (year, month, day) => {
	// 6 when it's saturday, 0 when it's sunday
	return new Date(year, month, day).getDay() % 7 === 6 || new Date(year, month, day).getDay() % 7 === 0
}

const isToday = (year, month, day) => {
	let utcYear = new Date().getFullYear();
	let utcMonth = new Date().getMonth();
	let utcDay = new Date().getDate();
	let utcDate = utcYear+'.'+utcMonth+'.'+utcDay;
	let utcYear2 = new Date(year, month, day).getFullYear();
	let utcMonth2 = new Date(year, month, day).getMonth();
	let utcDay2 = new Date(year, month, day).getDate();
	let utcDate2 = utcYear2+'.'+utcMonth2+'.'+utcDay2;
	return utcDate === utcDate2;
}

const getDayName = (yearNum, monthNum, day) => {
	const date = new Date(Date.UTC(yearNum, monthNum, day));

	const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);

	return dayName;
}

const getDaysInMonthUTC = (month, year) => {
  let date = new Date(Date.UTC(year, month, 1));
  let days = [];
  if(month == 12){
  	month = 0;
  }
  while (date.getUTCMonth() === month) {
    days.push(date.getDate());

    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}

const showCalculation = (year, pastMonth) => {
	calendar.innerHTML = '';
	days = getDaysInMonthUTC(pastMonth, year);
  monthLong = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(Date.UTC(year, pastMonth, 1)));
	monthName.innerHTML = '';
	monthName.insertAdjacentHTML("beforeend",`<h1>${monthLong}<br/>${year}</h1>`);

	for (let day = 1; day <= days.length; day++){

		const weekend = isWeekend(year, pastMonth, day);
		const today = isToday(year, pastMonth, day);

		let name = '';

		if(day <= 7){
			const dayName = getDayName(year, pastMonth, day);
			name = `<div class="name">${dayName}</div>`
		}

		calendar.insertAdjacentHTML(
			"beforeend",
			`<div class="day ${weekend ? "weekend" : ""} ${today ? "today" : ""}">
				${name}
				${day}
				${weekend ? "<br/><p style='color:#FFA500'>weekend</p>" : ""}
			</div>`
		);
	}
}

const calendarCalculator = (year, month) => {
	showCalculation(year, month);
}

let days = getDaysInMonthUTC(month, year);


monthName.insertAdjacentHTML("beforeend",`<h1>${monthLong}<br/>${year}</h1>`);

for (let day = 1; day <= days.length; day++){

	const weekend = isWeekend(year, month, day);
	const today = isToday(year, month, day);

	let name = '';

	if(day <= 7){
		const dayName = getDayName(year, month,day);
		name = `<div class="name">${dayName}</div>`
	}

	calendar.insertAdjacentHTML(
		"beforeend",
		`<div class="day ${weekend ? "weekend" : ""} ${today ? "today" : ""}">
			${name}
			${day}
			${weekend ? "<br/><p style='color:#FFA500'>weekend</p>" : ""}
		</div>`
	);
}

document.querySelectorAll('#app-calendar .day').forEach(day => {
	day.addEventListener("click", event => {
		event.currentTarget.classList.toggle("selected");
	});
});


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


// console.log(new Date(Date.UTC(2021, 12, 1)));