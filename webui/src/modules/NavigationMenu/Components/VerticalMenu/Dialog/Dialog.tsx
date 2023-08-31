import { Dialog as MuiDialog } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { DialogProps } from './types';

const Dialog: React.FC<DialogProps> = ({
	title,
	control,
	outlinedButtonLabel,
	containedButtonLabel,
	content,
	onOutlinedButtonClickedHandler,
	onContainedButtonClickedHandler,
	description
}) => {
	const { isOpen, closeHandler } = control;

	const onClickHandler = (callback: (() => void) | undefined) => {
		!!callback && callback();
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
				{outlinedButtonLabel && (
					<Button size={'small'} color={'error'} variant={'outlined'} onClick={() => onClickHandler(onOutlinedButtonClickedHandler)}>
						{outlinedButtonLabel}
					</Button>
				)}
				{containedButtonLabel && (
					<Button size={'small'} color={'error'} variant={'contained'} onClick={() => onClickHandler(onContainedButtonClickedHandler)}>
						{containedButtonLabel}
					</Button>
				)}
			</DialogActions>
		</MuiDialog>
	);
};
export default Dialog;
