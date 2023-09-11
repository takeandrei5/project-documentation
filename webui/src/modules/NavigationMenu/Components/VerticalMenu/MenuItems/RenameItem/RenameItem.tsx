import { Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type RenameItemProps } from './types';

const RenameItem:React.FC<RenameItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon sx={{ color: (theme) => theme.palette.common.black }}>drive_file_rename_outline</Icon>
			</ListItemIcon>
			<ListItemText><Typography variant='body2'>Rename</Typography></ListItemText>
			<Typography variant='body2' color='text.secondary'>
				⌘+R
			</Typography>
		</MenuItem>
	);
};

export default RenameItem;
