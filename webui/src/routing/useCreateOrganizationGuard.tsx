import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { readOneUserApi } from '../api';

const useCreateOrganizationGuard = () => {
	const { data: organizationData, isError, error } = useQuery(['organization_info'], readOneUserApi);

	const guard = (Component: React.ComponentType) => {
    if (isError || !organizationData) {
      console.error(error);
    }

    if (!organizationData || !organizationData.data) {
      return null;
    }

		if (organizationData.data.organizationId) {
			return <Navigate to={`/organizations/${organizationData.data.organizationId}/projects`} replace />;
		}

		return <Component />;
	};

	return guard;
};

export default useCreateOrganizationGuard;
