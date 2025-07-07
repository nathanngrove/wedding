"use client";

import React from "react";

type SelectOptionProps = {
	options: number;
	name: string;
	selected: number;
	disabled: boolean;
	setSelected: React.Dispatch<React.SetStateAction<number>>;
};

function SelectOption({
	options,
	name,
	selected,
	disabled,
	setSelected,
}: SelectOptionProps) {
	const optionsArray = Array(options)
		.fill(0)
		.map((_, i) => i);

	return (
		<select
			id={name}
			required
			disabled={disabled}
			onChange={(e) => setSelected(Number(e.target.value))}
			name={name}
			value={selected == null ? 0 : selected}
			className="disabled:bg-gray-300 text-xl py-2 px-4 w-full border-black border-[1px] rounded-lg">
			{optionsArray.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

export default SelectOption;
