import { Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type DeleteItemProps } from './types';

const DeleteItem: React.FC<DeleteItemProps> = ({ control, onClickHandler }) => {
	return (
		<MenuItem onClick={() => onClickHandler(control)}>
			<ListItemIcon>
				<Icon>delete</Icon>
			</ListItemIcon>
			<ListItemText>Delete</ListItemText>
			<Typography variant='body2' color='text.secondary'>
				⌘+⌫
			</Typography>
		</MenuItem>
	);
};

export default DeleteItem;
