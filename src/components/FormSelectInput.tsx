import React from "react";
import SelectOption from "./SelectOption";

type FormSelectInputProps = {
	options: number | Array<string>;
	name: string;
	selected: number | string;
	disabled?: boolean;
	setSelected?: React.Dispatch<React.SetStateAction<number>>;
	label: string;
	startAtZero?: boolean;
};

function FormSelectInput({
	options,
	name,
	selected,
	disabled = false,
	setSelected,
	label,
	startAtZero,
}: FormSelectInputProps) {
	return (
		<div className="grid gap-2">
			<label htmlFor={name}>{label}</label>
			<SelectOption
				startAtZero={startAtZero}
				name={name}
				options={options}
				selected={selected}
				setSelected={setSelected}
				disabled={disabled}
			/>
		</div>
	);
}

export default FormSelectInput;
