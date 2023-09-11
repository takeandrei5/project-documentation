import { Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { type CopyItemProps } from './types';

const CopyItem:React.FC<CopyItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon sx={{ color: (theme) => theme.palette.common.black }}>content_copy</Icon>
			</ListItemIcon>
			<ListItemText><Typography variant='body2'>Copy</Typography></ListItemText>
			<Typography variant='body2' color='text.secondary'>
				⌘+C
			</Typography>
		</MenuItem>
	);
};

export default CopyItem;
