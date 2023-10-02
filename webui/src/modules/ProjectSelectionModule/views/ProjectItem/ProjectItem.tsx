import { Box, Icon, Typography, type Theme } from '@mui/material';
import type { ProjectItemProps } from './types';

const ProjectItem: React.FC<ProjectItemProps> = ({ id, name, iconName, onClickHandler }) => {
	return (
		<Box
			sx={(theme: Theme) => ({
				display: 'grid',
				alignItems: 'center',
				gridTemplateColumns: '9fr 3fr',
				backgroundColor: 'inherit',
				borderRadius: '0.5rem',
				padding: '0.5rem',
				color: theme.palette.textColor[60],
				'& .Typography-root': {
					color: `${theme.palette.textColor[60]} !important`
				},
				'& .MuiIcon-root': {
					color: `${theme.palette.cyan[40]} !important`
				},
				'&:hover': {
					color: `${theme.palette.purple[100]} !important`,
					backgroundColor: theme.palette.cyan[10],
					'& *': {
						color: `${theme.palette.purple[100]} !important`
					}
				},
				'&:active': {
					backgroundColor: theme.palette.cyan[20]
				}
			})}>
			<Box onClick={() => onClickHandler(id)} sx={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr 8fr', alignItems: 'center' }}>
				<Icon>{iconName || 'text_snippet_outlined'}</Icon>
				<Typography variant='mediumRegular'>{name}</Typography>
			</Box>
			<Box
				sx={(theme: Theme) => ({
					display: 'flex',
					justifyContent: 'flex-end',
					marginLeft: 'auto',
					gap: '1rem',
					'& > .MuiIcon-root': {
						cursor: 'pointer'
					},
					'& > .MuiIcon-root:hover': {
						color: theme.palette.purple[100]
					},
					'& > .MuiIcon-root:active': {
						color: theme.palette.purple[100]
					}
				})}>
				{/* <Icon sx={(theme: Theme) => ({ color: theme.palette.cyan[40], fontSize: '1.25rem' })}>more_vert</Icon> */}
			</Box>
		</Box>
	);
};

export default ProjectItem;
