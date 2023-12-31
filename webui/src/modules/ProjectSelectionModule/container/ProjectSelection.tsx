import { Box, Paper, Typography, type Theme, Skeleton } from '@mui/material';
import { type ProjectItemDto } from '../../../api/webapi/projects/types';
import { ProjectItem } from '../views';
import { useProjectSelection } from './hooks';

const ProjectSelection: React.FC = () => {
	const { projectList, onCreateNewProjectClickedHandler, onProjectClickedHandler, isLoading, PROJECT_SELECTION_CONFIG } = useProjectSelection();

	return (
		<Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
			{!isLoading ? <Typography variant='extraLargeBold'>{PROJECT_SELECTION_CONFIG.title}</Typography> : <Skeleton animation='wave' variant='rounded' width='36.25rem' height='2rem' />}
			{!isLoading ? (
				<Paper
					sx={(theme: Theme) => ({
						width: '40rem',
						height: '25rem',
						maxHeight: '25rem',
						bgcolor: theme.palette.common.white,
						boxShadow: 6,
						padding: '1.5rem',
						borderRadius: '0.5rem',
						overflowY: 'auto',
						gap: '0.5rem',
						display: 'flex',
						flexDirection: 'column'
					})}>
					{projectList.map((project: ProjectItemDto) => (
						<ProjectItem key={project.id} id={project.id} name={project.name} iconName={project.iconName} onClickHandler={onProjectClickedHandler} />
					))}
					<ProjectItem id='create-project' name={PROJECT_SELECTION_CONFIG.createProject} iconName='add' onClickHandler={onCreateNewProjectClickedHandler} />
				</Paper>
			) : (
				<Skeleton animation='wave' variant='rounded' width='40rem' height='25rem' />
			)}
		</Box>
	);
};

export default ProjectSelection;
