import { Icon, ListItemIcon, ListItemText, MenuItem, Theme, Typography } from '@mui/material';
import { type RenameItemProps } from './types';

const RenameItem:React.FC<RenameItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon sx={(theme:Theme) => ({ color: theme.palette.textColor[60] })}>drive_file_rename_outline</Icon>
			</ListItemIcon>
			<ListItemText><Typography sx={(theme:Theme) => ({ color: theme.palette.textColor[60] })} variant='smallRegular'>Rename</Typography></ListItemText>
			<Typography variant='smallRegular' sx={(theme:Theme) => ({ color: theme.palette.textColor[20] })}>
				⌘+R
			</Typography>
		</MenuItem>
	);
};

export default RenameItem;
