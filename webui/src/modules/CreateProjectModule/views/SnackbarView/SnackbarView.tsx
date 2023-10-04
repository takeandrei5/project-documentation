import { Snackbar } from '@mui/material';
import type { SnackbarViewProps } from './types';

const SnackbarView: React.FC<SnackbarViewProps> = ({ duration, isOpen, message, onSnackbarClosedHandler }) => {
	return (
		<Snackbar
			autoHideDuration={duration}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			open={isOpen}
			onClose={onSnackbarClosedHandler}
			message={message}
			key='bottom-center'
			sx={{
				'div.MuiSnackbarContent-message': {
					fontSize: '1rem'
				}
			}}
		/>
	);
};

export default SnackbarView;
