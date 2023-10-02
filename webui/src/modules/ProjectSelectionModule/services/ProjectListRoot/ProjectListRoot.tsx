import { Box, Paper, Typography, type Theme } from '@mui/material';
import { type ProjectItemDto } from '../../../../api/webapi/projects/types';
import { ProjectItem } from '../../views';
import { PROJECT_SELECTION_LABELS } from './config';
import useProjectListRoot from './hooks';

const ProjectListRoot: React.FC = () => {
	const { projectList, onCreateNewProjectClickedHandler, onProjectClickedHandler, isFetching } = useProjectListRoot();

  if (isFetching) {
    return null;
  }

	return (
		<Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
			<Typography variant='extraLargeBold'>{PROJECT_SELECTION_LABELS.Title}</Typography>
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
          flexDirection: 'column',
				})}>
				{projectList.map((project: ProjectItemDto) => (
					<ProjectItem key={project.id} id={project.id} name={project.name} iconName={project.iconName} onClickHandler={onProjectClickedHandler} />
				))}
        <ProjectItem id='create-project' name={PROJECT_SELECTION_LABELS.CreateProject} iconName='add' onClickHandler={onCreateNewProjectClickedHandler} />
			</Paper>
		</Box>
	);
};

export default ProjectListRoot;
