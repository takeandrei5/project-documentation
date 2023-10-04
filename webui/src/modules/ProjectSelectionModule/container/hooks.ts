import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { readAllProjectsApi } from '../../../api';
import { useEffect } from 'react';

const useProjectSelection = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { data: projectList, isError, error, isLoading } = useQuery(['projects_list'], () => readAllProjectsApi(params['organizationId'] as string));

	const PROJECT_SELECTION_CONFIG = {
		title: 'Select or create a project from the list below',
		createProject: 'Create project'
	};

	useEffect(() => {
		if (isError || !!error) {
			console.error(error);
		}
	}, [isError, error]);

	const onProjectClickedHandler = (id: string) => {
		navigate(`/organizations/${params['organizationId']}/projects/${id}/project-documentation`);
	};

	const onCreateNewProjectClickedHandler = (): void => {
		navigate(`/organizations/${params['organizationId']}/create-project`);
	};

	return { projectList: projectList?.data.projects || [], onCreateNewProjectClickedHandler, onProjectClickedHandler, isLoading, PROJECT_SELECTION_CONFIG };
};

export { useProjectSelection };
