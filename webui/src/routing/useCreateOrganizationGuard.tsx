import { Box, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { readOneUserApi } from '../api';

const useCreateOrganizationGuard = () => {
	const { data: organizationData, isError, error } = useQuery(['organization_info'], readOneUserApi);

	const guard = (Component: React.ComponentType) => {
		if (isError) {
			console.log(error);
		}

		if (!organizationData) {
			return (
				<Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Skeleton animation='wave' variant='rounded' width='40rem' height='25rem' />
				</Box>
			);
		}

		if (organizationData.data.organizationId) {
			return <Navigate to={`/organizations/${organizationData.data.organizationId}/projects`} replace />;
		}

		return <Component />;
	};

	return guard;
};

export default useCreateOrganizationGuard;
