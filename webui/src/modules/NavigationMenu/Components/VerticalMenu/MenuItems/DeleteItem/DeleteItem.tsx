import { Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type DeleteItemProps } from './types';

const DeleteItem: React.FC<DeleteItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon>delete</Icon>
			</ListItemIcon>
			<ListItemText>Delete</ListItemText>
			<Typography variant='body2' color='text.secondary'>
				⌘⌫
			</Typography>
		</MenuItem>
	);
};

export default DeleteItem;
