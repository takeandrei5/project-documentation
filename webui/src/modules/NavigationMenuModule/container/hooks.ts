import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { readOneProjectApi } from '../../../api/webapi/projects';

const useNavigationMenu = () => {
	const params = useParams<{ projectId: string; organizationId: string }>();
	const {
		data,
		isLoading,
		refetch: refetchProjectData
	} = useQuery({
		queryKey: ['project_info', params.organizationId, params.projectId],
		queryFn: () => readOneProjectApi(params.projectId!, params.organizationId!)
	});

	return { isLoading, pages: data?.pages || [], projectName: data?.name || '', refetchProjectData };
};

export { useNavigationMenu };
