import { Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type DuplicateItemProps } from './types';

const DuplicateItem: React.FC<DuplicateItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon>content_paste</Icon>
			</ListItemIcon>
			<ListItemText>Duplicate</ListItemText>
			<Typography variant='body2' color='text.secondary'>
				⌘+D
			</Typography>
		</MenuItem>
	);
};

export default DuplicateItem;
