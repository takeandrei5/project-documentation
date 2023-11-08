import { ListItemIcon, ListItemText, MenuItem, Typography, type Theme } from '@mui/material';
import type { VerticalMenuItemProps } from './types';

const VerticalMenuItem: React.FC<VerticalMenuItemProps> = ({ color = '', shortcut = '', icon, onClickHandler, text }) => {
  const Icon = icon;

	return (
		<MenuItem onClick={onClickHandler} sx={{display: 'grid', gridTemplateColumns: '1.75rem 1fr 2.5rem'}}>
			{!!Icon && (
				<ListItemIcon sx={{marginRight: '0.25rem !important'}}>
					<Icon sx={{ color: (theme: Theme) => !color ? theme.palette.textColor[60] : color, fontSize: '1.25rem !important' }} />
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
