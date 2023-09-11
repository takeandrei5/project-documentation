import { Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type DuplicateItemProps } from './types';

const DuplicateItem:React.FC<DuplicateItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon sx={{ color: (theme) => theme.palette.common.black }}>content_paste</Icon>
			</ListItemIcon>
			<ListItemText><Typography variant='body2'>Duplicate</Typography></ListItemText>
			<Typography variant='body2' color='text.secondary'>
				⌘+D
			</Typography>
		</MenuItem>
	);
};

export default DuplicateItem;
