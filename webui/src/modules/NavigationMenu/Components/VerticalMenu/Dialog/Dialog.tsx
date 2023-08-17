import * as React from 'react';
import Button from '@mui/material/Button';
import { Dialog as MuiDialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from './types';

const Dialog:React.FC<DialogProps> = ({
																				title,
																				control,
																				confirmLabel,
																				deleteLabel,
																				content,
																				onPermanentlyDelete,
																				onConfirm,
																				description
																			}) => {
	const { isOpen, closeHandler } = control;

	const confirmHandler = ():void => {
		onConfirm();
		closeHandler();
	};
	const permanentlyDeleteHandler = ():void => {
		onPermanentlyDelete();
		closeHandler();
	};
	return (
		<MuiDialog open={isOpen} onClose={closeHandler}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{description && <DialogContentText>{description}</DialogContentText>}
				{content}
			</DialogContent>
			<DialogActions>
				<Button size={'small'} color={'error'} variant={'outlined'} onClick={confirmHandler}>{confirmLabel}</Button>
				<Button size={'small'} color={'error'} variant={'contained'} onClick={permanentlyDeleteHandler}>{deleteLabel}</Button>
			</DialogActions>
		</MuiDialog>
	);

};
export default Dialog;