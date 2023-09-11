import { ListItem, ListItemIcon, Typography, Icon, type Theme } from '@mui/material';
import type { NavigationMenuItemProps } from './types';

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ icon, onClick, text }) => {
	return (
		<ListItem
			onClick={onClick}
			sx={(theme: Theme) => ({
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
				'& span': {
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
			})}>
			<ListItemIcon
				sx={(theme: Theme) => ({
					'&:hover': {
						color: theme.palette.purple[100]
					},
					'&:active': {
						color: theme.palette.purple[100]
					},
					minWidth: 'fit-content',
					width: 'fit-content'
				})}>
				<Icon sx={(theme: Theme) => ({ color: theme.palette.cyan[40], fontSize: '1.25rem' })}>{icon}</Icon>
			</ListItemIcon>
			<Typography variant={'smallMedium'} sx={(theme: Theme) => ({ color: theme.palette.textColor[60] })}>
				{text}
			</Typography>
		</ListItem>
	);
};

export default NavigationMenuItem;
