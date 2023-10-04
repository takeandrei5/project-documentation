import { Dialog as MuiDialog, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ButtonC } from '../ButtonC';
import type { DialogCProps } from './types';

const DialogC: React.FC<DialogCProps> = ({
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
			<DialogTitle>
				<Typography variant={'largeBold'} sx={(theme) => ({ color: theme.palette.textColor[100] })}>
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent>
				{description && <DialogContentText>{description}</DialogContentText>}
				{content}
			</DialogContent>
			<DialogActions>
				{outlinedButtonLabel && (
					<ButtonC size={'small'} variant={'primary'} onClick={() => onClickHandler(onOutlinedButtonClickedHandler)}>
						{outlinedButtonLabel}
					</ButtonC>
				)}
				{containedButtonLabel && (
					<ButtonC size={'small'} variant={'secondary'} onClick={() => onClickHandler(onContainedButtonClickedHandler)}>
						{containedButtonLabel}
					</ButtonC>
				)}
			</DialogActions>
		</MuiDialog>
	);
};
export default DialogC;
