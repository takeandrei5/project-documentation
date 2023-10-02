import type { DialogControlProps } from '../../../../../utils/types';

export type DialogProps = {
	control: DialogControlProps;
	content: React.ReactNode;
	title: string;
	outlinedButtonLabel?: string;
	containedButtonLabel?: string;
	onOutlinedButtonClickedHandler?: () => void;
	onContainedButtonClickedHandler?: () => void;
	description?: string;
};
