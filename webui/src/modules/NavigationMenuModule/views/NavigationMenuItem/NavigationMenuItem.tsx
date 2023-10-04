import { ListItem, ListItemIcon, Typography, Icon, type Theme, Skeleton } from '@mui/material';
import type { NavigationMenuItemProps } from './types';

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ isLoading, icon, onClick, text }) => {
	return (
		<>
			{!isLoading ? (
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
						padding: '0.5rem',
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
					<Typography variant='smallMedium' sx={(theme: Theme) => ({ color: theme.palette.textColor[60] })}>
						{text}
					</Typography>
				</ListItem>
			) : (
				<Skeleton animation='wave' variant='rounded' width='100%' height='2rem' sx={{ marginBottom: '0.5rem' }} />
			)}
		</>
	);
};

export default NavigationMenuItem;
