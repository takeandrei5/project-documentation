import { Icon, ListItemIcon, ListItemText, MenuItem, Typography, type Theme } from '@mui/material';
import type { VerticalMenuItemProps } from './types';

const VerticalMenuItem: React.FC<VerticalMenuItemProps> = ({ color = '', shortcut = '', iconName = '', onClickHandler, text }) => {
	return (
		<MenuItem onClick={onClickHandler}>
			{!!iconName && (
				<ListItemIcon>
					<Icon sx={{ color: (theme: Theme) => !color ? theme.palette.textColor[60] : color }}>{iconName}</Icon>
				</ListItemIcon>
			)}
			<ListItemText>
				<Typography sx={(theme: Theme) => ({ color: !color ? theme.palette.textColor[60] : color })} variant='smallRegular'>
					{text}
				</Typography>
			</ListItemText>
			{!!shortcut && (
				<Typography variant='smallRegular' sx={(theme: Theme) => ({ color: theme.palette.textColor[20]})}>
					{shortcut}
				</Typography>
			)}
		</MenuItem>
	);
};

export default VerticalMenuItem;
