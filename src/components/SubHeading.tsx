"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type SubHeadingProps = {
	text: string;
	className?: string;
};

function SubHeading({ text, className }: SubHeadingProps) {
	return (
		<h2
			className={
				className
					? twMerge(`lg:text-5xl text-3xl font-serif`, className)
					: `lg:text-5xl text-3xl font-serif`
			}>
			{text}
		</h2>
	);
}

export default SubHeading;
