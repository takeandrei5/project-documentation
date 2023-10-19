import type * as MUIIcons from '@mui/icons-material';

export type FetchError = Error & {
	statusCode: number;
};

export type InputFieldProps = {
	id: string;
	name: string;
	label: string;
	placeholder?: string;
	type: InputFieldTypesVariant;
};

export type InputFieldTypesVariant = 'text' | 'password' | 'email' | 'number';

export type MUIIconKeys = keyof typeof MUIIcons;
