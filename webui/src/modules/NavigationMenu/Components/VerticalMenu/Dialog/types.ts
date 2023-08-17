import { DialogControlProps } from '../../../../../utils/types';

export type DialogProps = {
	control:DialogControlProps;
	content:React.ReactNode;
	title:string;
	description?:string;
	confirmLabel?:string
	deleteLabel?:string
	onConfirm:() => void
	onPermanentlyDelete:() => void
}
