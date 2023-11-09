import type { SelectChangeEvent } from '@mui/material/Select';

export type DropdownOption = {
	value: string;
	label: string;
};

export type DropdownFieldProps = {
	id: string;
	label: string;
	name: string;
	onChange: (event: SelectChangeEvent) => void;
	options: DropdownOption[];
	value: string;
};
