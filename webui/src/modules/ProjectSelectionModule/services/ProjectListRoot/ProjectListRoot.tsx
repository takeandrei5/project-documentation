import { ProjectItemDto } from '../../../../api/webapi/projects/types';
import { ProjectItem } from '../../views';
import useProjectListRoot from './hooks';

const ProjectListRoot: React.FC = () => {
	const { projectList, onClickHandler } = useProjectListRoot();

	return (
		<>
			{projectList.map((project: ProjectItemDto) => (
				<ProjectItem key={project.id} id={project.id} name={project.name} iconName={project.iconName} onClickHandler={onClickHandler} />
			))}
		</>
	);
};

export default ProjectListRoot;
