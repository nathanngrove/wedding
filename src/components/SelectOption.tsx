"use client";

import React from "react";

type SelectOptionProps = {
	options: number | Array<string>;
	name: string;
	selected: number | string;
	disabled: boolean;
	setSelected?: React.Dispatch<React.SetStateAction<number>>;
	startAtZero?: boolean;
};

function SelectOption({
	options,
	name,
	selected,
	disabled,
	setSelected,
	startAtZero,
}: SelectOptionProps) {
	console.log(selected);

	let selectableOptions: Array<number> | Array<string>;
	let selectedValue: number | string;
	if (typeof options === "number") {
		selectableOptions = Array(options)
			.fill(0)
			.map((num, i) => (num = startAtZero == true ? i : i + 1));
		selectedValue = selected;
	} else {
		selectableOptions = options;
		selectedValue = selected == 0 ? "No" : "Yes";
	}

	return (
		<select
			id={name}
			required
			disabled={disabled}
			onChange={
				setSelected == undefined
					? undefined
					: (e) =>
							setSelected(() => {
								if (e.target.value == "Yes") {
									return 1;
								} else if (e.target.value == "No") {
									return 0;
								} else {
									return Number(e.target.value);
								}
							})
			}
			name={name}
			value={selectedValue}
			className="disabled:bg-gray-300 text-xl py-2 px-4 w-full border-black border-[1px] rounded-lg">
			{selectableOptions.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

export default SelectOption;
