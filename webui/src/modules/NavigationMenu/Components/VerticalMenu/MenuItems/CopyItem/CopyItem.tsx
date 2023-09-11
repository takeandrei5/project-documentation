import { Icon, ListItemIcon, ListItemText, MenuItem, Theme, Typography } from '@mui/material';
import { type CopyItemProps } from './types';

const CopyItem:React.FC<CopyItemProps> = ({ onClickHandler }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			<ListItemIcon>
				<Icon sx={{ color: (theme:Theme) => theme.palette.textColor[60] }}>content_copy</Icon>
			</ListItemIcon>
			<ListItemText><Typography sx={(theme:Theme) => ({ color: theme.palette.textColor[60] })} variant='smallRegular'>Copy</Typography></ListItemText>
			<Typography variant='smallRegular' sx={(theme:Theme) => ({ color: theme.palette.textColor[20] })}>
				⌘+C
			</Typography>
		</MenuItem>
	);
};

export default CopyItem;
