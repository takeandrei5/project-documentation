export type DialogCProps = {
	control: DialogControl;
	content: React.ReactNode;
	title: string;
	outlinedButtonLabel?: string;
	containedButtonLabel?: string;
	onOutlinedButtonClickedHandler?: () => void;
	onContainedButtonClickedHandler?: () => void;
	description?: string;
};

export type DialogControl = {
	isOpen: boolean;
	closeHandler: () => void;
	openHandler: () => void;
};