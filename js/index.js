import {isWeekend} from "./helpers.js";
import {isToday} from "./helpers.js";
import {getDayName} from "./helpers.js";
import {getDaysInMonthUTC} from "./helpers.js";
import {showCalculation} from "./helpers.js";
import {calendarCalculator} from "./helpers.js";

const calendar = document.querySelector('#app-calendar');
const monthName = document.querySelector('#month-name');
const previous = document.querySelector('#previous');
const future = document.querySelector('#future');
let year = new Date().getFullYear();
let month = new Date().getMonth();
let monthLong = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(Date.UTC(year, month, 1)));



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
			${today ? "<h3 style='color:#9af467'>today</h3>" : ""}
		</div>`
	);
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


document.querySelectorAll('#app-calendar .day').forEach(day => {
	day.addEventListener("click", event => {
		event.currentTarget.classList.toggle("selected");
	});
});

// console.log(new Date(Date.UTC(2021, 12, 1)));