export type TextInputPopupProps = {
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClosePopperHandler: () => void;
	onSaveHandler: () => void;
	value: string;
};
