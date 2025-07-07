"use client";

import { useEffect, useState } from "react";

const countdownDate = new Date("2025-09-20T00:00:00");

export default function useCountdown() {
	const [days, setDays] = useState("000");
	const [hours, setHours] = useState("000");
	const [minutes, setMinutes] = useState("000");
	const [seconds, setSeconds] = useState("000");
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

	useEffect(() => {
		const timeInMillisecondsUntilDate =
			countdownDate.valueOf() - currentDate.valueOf();

		const daysUntilDate = timeInMillisecondsUntilDate / 1000 / 86400;
		const daysUntilDateRemainderInSeconds =
			(timeInMillisecondsUntilDate / 1000) % 86400;

		const hoursUntilDate = daysUntilDateRemainderInSeconds / 3600;
		const hoursUntilDateRemainderInSeconds =
			daysUntilDateRemainderInSeconds % 3600;

		const minutesUntilDate = hoursUntilDateRemainderInSeconds / 60;
		const secondsUntilDate = hoursUntilDateRemainderInSeconds % 60;

		setDays(daysUntilDate.toString().split(".")[0]);
		setHours(hoursUntilDate.toString().split(".")[0]);
		setMinutes(minutesUntilDate.toString().split(".")[0]);
		setSeconds(secondsUntilDate.toString().split(".")[0]);
	}, [currentDate]);

	setTimeout(() => {
		setCurrentDate(new Date());
	}, 1000);

	return { days, hours, minutes, seconds };
}
