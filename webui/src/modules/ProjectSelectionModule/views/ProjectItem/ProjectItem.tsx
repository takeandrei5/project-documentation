import { Box, Icon, Typography, type Theme, Divider } from '@mui/material';
import type { ProjectItemProps } from './types';

const ProjectItem: React.FC<ProjectItemProps> = ({ id, name, iconName, onClickHandler }) => {
	return (
		<>
			<Box
				sx={{
					display: 'grid',
					alignItems: 'center',
					gridTemplateColumns: '1fr 8fr 3fr'
				}}>
				{/* {iconName && <Icon>{iconName}</Icon>} */}
				<Box></Box>
				<Typography
					variant='mediumRegular'
					onClick={() => onClickHandler(id)}
					sx={(theme: Theme) => ({
						cursor: 'pointer',
						color: theme.palette.cyan[40],
						'&:hover': {
							color: theme.palette.purple[100]
						},
						'&:active': {
							color: theme.palette.purple[100]
						}
					})}>
					{name}
				</Typography>
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
					<Icon sx={(theme: Theme) => ({ color: theme.palette.cyan[40], fontSize: '1.25rem' })}>more_vert</Icon>
				</Box>
			</Box>
			<Divider sx={(theme: Theme) => ({ borderColor: theme.palette.textColor[40], marginTop: '0.5rem' })} />
		</>
	);
};

export default ProjectItem;
