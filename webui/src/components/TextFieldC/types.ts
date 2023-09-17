export type TextFieldCProps = {
	id: string;
	name?: string;
	value: unknown;
	onChange: (value: string | React.ChangeEvent<Element>) => void | ((value: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void);
	label: string;
	placeholder?: string;
	onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	hasError?: boolean;
};
