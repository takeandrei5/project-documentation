import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import { NavigationLayoutOutlet } from '../../layouts';
import { MainLayoutOutlet } from '../../layouts/MainLayoutOutlet';
import { CreateOrganizationPage, ProjectPage, ProjectSelectionPage, TrashPage } from '../../pages';
import { useAccessToken } from '../../routing';

const RouterProvider: React.FC = withAuthenticationRequired(() => {
	const { isAccessTokenInjected, isAuthenticated } = useAccessToken();

	if (!isAccessTokenInjected || !isAuthenticated) {
		return null;
	}

	return (
		<Routes>
			<Route element={<MainLayoutOutlet />}>
				{/* <Route path='/' element={<Navigate to='/' replace />} /> */}
				<Route path='/create-organization' element={<CreateOrganizationPage />} />
				<Route path='/organizations/:organizationId' element={<ProjectSelectionPage />} />
				<Route path='/organizations/:organizationId/projects' element={<ProjectSelectionPage />} />
			</Route>
			<Route element={<NavigationLayoutOutlet />}>
				<Route path='/organizations/:organizationId/projects/:projectId/project-documentation' element={<ProjectPage />} />
				<Route path='/organizations/:organizationId/projects/:projectId/project-documentation/trash' element={<TrashPage />} />
			</Route>
			<Route path='*' element={<div>Not found ...</div>} />
		</Routes>
	);
});

export default RouterProvider;
