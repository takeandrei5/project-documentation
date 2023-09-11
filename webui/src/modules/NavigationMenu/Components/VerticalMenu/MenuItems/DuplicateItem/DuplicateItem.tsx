import { Icon, ListItemIcon, ListItemText, MenuItem, Theme, Typography } from '@mui/material';
import { type DuplicateItemProps } from './types';

const DuplicateItem:React.FC<DuplicateItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon sx={(theme:Theme) => ({ color: theme.palette.textColor[60] })}>content_paste</Icon>
			</ListItemIcon>
			<ListItemText><Typography sx={(theme:Theme) => ({ color: theme.palette.textColor[60] })} variant='smallRegular'>Duplicate</Typography></ListItemText>
			<Typography variant='smallRegular' sx={(theme:Theme) => ({ color: theme.palette.textColor[20] })}>
				⌘+D
			</Typography>
		</MenuItem>
	);
};

export default DuplicateItem;
