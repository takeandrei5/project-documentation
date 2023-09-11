import { Divider, Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type DeleteItemProps } from './types';

const DeleteItem:React.FC<DeleteItemProps> = ({ control, onClickHandler }) => {
	return (
		<>
			<Divider sx={{ mt: '0.25rem !important', mb: '0.25rem !important' }} />
			<MenuItem onClick={() => onClickHandler(control)}>
				<ListItemIcon>
					<Icon sx={{ color: (theme) => theme.palette.red[60] }}>delete</Icon>
				</ListItemIcon>
				<ListItemText><Typography variant='body2' sx={{ color: (theme) => theme.palette.red[80] }}>Delete</Typography></ListItemText>
				<Typography variant='body2' color='text.secondary'>
					⌘+⌫
				</Typography>
			</MenuItem>
		</>
	);
};

export default DeleteItem;
