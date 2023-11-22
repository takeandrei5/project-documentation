import { Box, Dialog, Typography, type Theme } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FormDialogCProps } from './types.ts';
import { ButtonC } from '../index.tsx';

const FormDialogC: React.FC<FormDialogCProps> = ({ isOpen, onCloseHandler, dialogActions, title, content, description }: FormDialogCProps) => {
	return (
		<Dialog
			open={isOpen}
			onClose={onCloseHandler}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			sx={{
				'& .MuiPaper-root': {
					width: '30rem '
				}
			}}>
			<DialogTitle id='alert-dialog-title'>
				<Typography variant={'largeBold'} sx={(theme: Theme) => ({ color: theme.palette.textColor[100] })}>
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent>
				{description && <DialogContentText>{description}</DialogContentText>}
				<Box component={'form'}>{content}</Box>
			</DialogContent>

			<DialogActions sx={{ padding: '1rem 1.5rem', justifyContent: 'initial' }}>
				<ButtonC size={'small'} variant={'secondary'} onClick={onCloseHandler}>
					Cancel
				</ButtonC>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: '1', gap: '0.5rem' }}>{dialogActions}</Box>
			</DialogActions>
		</Dialog>
	);
};
export default FormDialogC;
