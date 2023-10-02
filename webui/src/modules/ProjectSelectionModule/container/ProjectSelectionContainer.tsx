import { Box, Paper, Typography, type Theme } from '@mui/material';
import { ProjectListRoot } from '../services';
import { PROJECT_SELECTION_LABELS } from './config';

const ProjectSelectionContainer: React.FC = () => {
	return (
		<Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
			<Typography variant='extraLargeBold'>{PROJECT_SELECTION_LABELS.Title}</Typography>
			<Paper
				sx={(theme: Theme) => ({
					width: '40rem',
					height: '25rem',
					bgcolor: theme.palette.common.white,
					boxShadow: 6,
					padding: '1.5rem',
					borderRadius: '0.5rem',
					overflowY: 'auto'
				})}>
				<ProjectListRoot />
			</Paper>
		</Box>
	);
};

export default ProjectSelectionContainer;
