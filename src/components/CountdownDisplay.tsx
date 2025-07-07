"use client";

import React from "react";
import { Parisienne } from "next/font/google";

const parisienne = Parisienne({
	weight: "400",
	preload: true,
	subsets: ["latin"],
});

type CountdownDisplayProps = {
	time: string;
	unitOfTime: string;
};

function CountdownDisplay({ time, unitOfTime }: CountdownDisplayProps) {
	return (
		<div className={`flex flex-col items-center`}>
			<div
				className={`md:text-3xl text-2xl ${parisienne.className} text-white`}>
				{time}
			</div>
			<div className="md:text-xl text-lg text-white font-serif">
				{unitOfTime}
			</div>
		</div>
	);
}

export default CountdownDisplay;
