import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { readAllProjectsApi } from '../../../api';

const useProjectSelection = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { data: projectList, isLoading } = useQuery(['projects_list'], () => readAllProjectsApi(params['organizationId'] as string));

	const PROJECT_SELECTION_CONFIG = {
		title: 'Select or create a project from the list below',
		createProject: 'Create project'
	};

	const onProjectClickedHandler = (id: string) => {
		navigate(`/organizations/${params['organizationId']}/projects/${id}/project-documentation`);
	};

	const onCreateNewProjectClickedHandler = (): void => {
		navigate(`/organizations/${params['organizationId']}/create-project`);
	};

	return { isLoading, projectList: projectList?.data.projects || [], onCreateNewProjectClickedHandler, onProjectClickedHandler, PROJECT_SELECTION_CONFIG };
};

export { useProjectSelection };
