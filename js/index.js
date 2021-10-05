const calendar = document.querySelector('#app-calendar');

const isWeekend = day => {
	// 6 when it's saturday, 0 when it's sunday
	return day % 7 === 6 || day % 7 === 0
}

const getDayName = day => {
	const date = new Date(Date.UTC(2021, 9, day));

	const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

	return dayName;
}

for (let day = 1; day <= 31; day++){

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
