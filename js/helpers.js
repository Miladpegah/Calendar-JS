const isWeekend = day => {
	// 6 when it's saturday, 0 when it's sunday
	return day % 7 === 6 || day % 7 === 0
}

const getDayName = day => {
	const date = new Date(Date.UTC(2021, 9, day));

	const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

	return dayName;
}

export {isWeekend}
export {getDayName}