import {isWeekend} from "./helpers.js";
import {getDayName} from "./helpers.js";
import {getDaysInMonthUTC} from "./helpers.js";

const calendar = document.querySelector('#app-calendar');

let year = new Date().getFullYear();
let month = new Date().getMonth();

let days = getDaysInMonthUTC(month, year);

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
