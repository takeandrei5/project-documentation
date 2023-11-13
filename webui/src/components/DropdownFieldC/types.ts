export type DropdownOption = {
	value: string;
	label: string;
};

export type DropdownFieldProps = {
	id: string;
	name: string;
	label: string;
	onChange: (value: string) => void;
	options: DropdownOption[];
	value: string;
  disabled?: boolean;
};
