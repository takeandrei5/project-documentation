import { Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type RenameItemProps } from './types';

const RenameItem:React.FC<RenameItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon>drive_file_rename_outline</Icon>
			</ListItemIcon>
			<ListItemText>Rename</ListItemText>
			<Typography variant='body2' color='text.secondary'>
				⌘+R
			</Typography>
		</MenuItem>
	);
};

export default RenameItem;
