
export type FormDialogCProps = {
	isOpen: boolean;
	onCloseHandler: () => void;
	title: string;
	content: React.ReactNode;
	description?: string;
	dialogActions: React.ReactNode;
};
