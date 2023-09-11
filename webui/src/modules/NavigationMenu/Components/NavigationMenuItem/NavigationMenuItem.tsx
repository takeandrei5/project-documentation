import { ListItem, ListItemIcon, type Theme, Typography, useTheme } from '@mui/material';
import type { NavigationMenuItemProps } from './types';

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ icon, onClick, text }) => {
	const theme: Theme = useTheme();

	return (
		<ListItem
			onClick={onClick}
			sx={{
				backgroundColor: 'inherit',
				borderRadius: '0.5rem',
				color: theme.palette.textColor[60],
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'flex-start',
				gap: '1rem',
				padding: '0.75rem 0.5rem 0.75rem 0.75rem',
				'& path': {
					fill: theme.palette.cyan[40]
				},
				'&:hover': {
					backgroundColor: theme.palette.cyan[10],
					color: theme.palette.purple[100],
					'& path': {
						fill: theme.palette.purple[100]
					},
					'& span': {
						color: theme.palette.purple[100],
            fontWeight: 700
					}
				},
				'&:active': {
					backgroundColor: theme.palette.cyan[20],
					color: theme.palette.purple[100]
				}
			}}>
			<ListItemIcon
				sx={{
					'&:hover': {
						color: theme.palette.purple[100]
					},
					'&:active': {
						color: theme.palette.purple[100]
					},
					minWidth: 'fit-content',
					width: 'fit-content',
					'& > svg': { width: '1.25rem !important', height: '1.25rem !important' }
				}}>
				{icon}
			</ListItemIcon>
			<Typography variant={'smallMedium'} color={theme.palette.textColor[60]}>
				{text}
			</Typography>
		</ListItem>
	);
};

export default NavigationMenuItem;
