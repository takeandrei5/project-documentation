export type NodeTextInputProps = {
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSaveHandler: () => void;
	value: string;
	onBlurHandler?: () => void;
};
