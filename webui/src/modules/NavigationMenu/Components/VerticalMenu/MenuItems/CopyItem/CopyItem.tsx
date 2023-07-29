import { Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type CopyItemProps } from './types';

const CopyItem: React.FC<CopyItemProps> = ({onClickHandler}) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon>content_copy</Icon>
			</ListItemIcon>
			<ListItemText>Copy</ListItemText>
			<Typography variant='body2' color='text.secondary'>
				⌘C
			</Typography>
		</MenuItem>
	);
};

export default CopyItem;