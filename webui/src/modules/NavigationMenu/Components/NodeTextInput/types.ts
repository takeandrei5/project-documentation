export type NodeTextInputProps = {
	onChangeHandler:(event:React.ChangeEvent<HTMLInputElement>) => void;
	onClosePopperHandler:() => void;
	onSaveHandler:() => void;
	value:string;
	onBlurHandler?:() => void;
	ref?:React.RefObject<HTMLInputElement>;
};
