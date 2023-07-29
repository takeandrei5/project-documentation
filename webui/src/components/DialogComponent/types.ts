export type DialogControl = {
	isOpen: boolean;
	closeHandler: () => void;
	openHandler: () => void;
}

export type DialogComponentProps = {
	title: string;
	description?: string;
	content: JSX.Element;
	onSubmit: () => void;
	control: DialogControl;
	cancelButtonLabel?: string;
	submitButtonLabel?: string;
}