import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { readAllProjectsApi } from '../../../../api';
import { useEffect } from 'react';

const useProjectListRoot = () => {
	const params = useParams();
  const navigate = useNavigate();

	const { data: projectList, isError, error } = useQuery(['projects_list', params['organizationId']], () => readAllProjectsApi(params['organizationId'] as string));

	useEffect(() => {
		if (isError || !!error) {
			console.error(error);
		}
	}, [isError, error]);

  const onClickHandler = (id: string) => {
    navigate(`/organizations/${params['organizationId']}/projects/${id}`);
  };

	return { projectList: projectList?.data.projects || [], onClickHandler };
};

export default useProjectListRoot;
