export type TextFieldCProps = {
	label: string;
	id: string;
	value: unknown;
  disabled?: boolean;
	errorMessage?: string;
	hasError?: boolean;
  multiline?: boolean;
	name?: string;
	onChange: (value: string | React.ChangeEvent<Element>) => void | ((value: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void);
	onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	placeholder?: string;
};
