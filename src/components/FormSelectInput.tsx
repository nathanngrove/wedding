import React from "react";
import SelectOption from "./SelectOption";

type FormSelectInputProps = {
	options: number;
	name: string;
	selected: number;
	disabled?: boolean;
	setSelected: React.Dispatch<React.SetStateAction<number>>;
	label: string;
};

function FormSelectInput({
	options,
	name,
	selected,
	disabled = false,
	setSelected,
	label,
}: FormSelectInputProps) {
	return (
		<div className="grid gap-2">
			<label htmlFor={name}>{label}</label>
			<SelectOption
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
