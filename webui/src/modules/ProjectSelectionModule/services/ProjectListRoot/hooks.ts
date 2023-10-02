import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { readAllProjectsApi } from '../../../../api';
import { useEffect } from 'react';

const useProjectListRoot = () => {
	const params = useParams();
  const navigate = useNavigate();

	const { data: projectList, isError, error, isFetching } = useQuery(['projects_list', params['organizationId']], () => readAllProjectsApi(params['organizationId'] as string));

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

	return { projectList: projectList?.data.projects || [], onCreateNewProjectClickedHandler, onProjectClickedHandler, isFetching };
};

export default useProjectListRoot;
