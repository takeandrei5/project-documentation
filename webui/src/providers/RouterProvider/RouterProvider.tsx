import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationLayoutOutlet } from '../../layouts';
import { MainLayoutOutlet } from '../../layouts/MainLayoutOutlet';
import { CreateOrganizationPage, CreateProjectPage, ProjectDocumentationPage, ProjectSelectionPage, SettingsPage, TrashPage } from '../../pages';
import { useAccessToken } from '../../routing';

const RouterProvider: React.FC = withAuthenticationRequired(() => {
	const { isAccessTokenInjected, isAuthenticated } = useAccessToken();
	if (!isAccessTokenInjected || !isAuthenticated) {
		return null;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const payloadParam = urlParams.get('payload');

	if (payloadParam) {
		const payload: { accessToken: string; refreshToken: string; accessibleResourceIds: string } = JSON.parse(payloadParam);

		localStorage.setItem('accessToken', payload.accessToken);
		localStorage.setItem('refreshToken', payload.refreshToken);
		localStorage.setItem('accessibleResourceIds', payload.accessibleResourceIds);

		const newUrl = window.location.href.split('?')[0];
		window.location.href = newUrl;
	}

	return (
		<Routes>
			<Route element={<MainLayoutOutlet />}>
				{/* <Route path='/' element={<Navigate to='/' replace />} /> */}
				<Route path='/create-organization' element={<CreateOrganizationPage />} />
				<Route path='/organizations/:organizationId/create-project' element={<CreateProjectPage />} />
				<Route path='/organizations/:organizationId' element={<Navigate to='projects' replace />} />
				<Route path='/organizations/:organizationId/projects' element={<ProjectSelectionPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Route>
			<Route element={<NavigationLayoutOutlet />}>
				<Route path='/organizations/:organizationId/projects/:projectId/project-documentation' element={<ProjectDocumentationPage />} />
				<Route path='/organizations/:organizationId/projects/:projectId/project-documentation/pages/:pageId' element={<ProjectDocumentationPage />} />
				<Route path='/organizations/:organizationId/projects/:projectId/project-documentation/trash' element={<TrashPage />} />
			</Route>
			<Route path='*' element={<div>Not found ...</div>} />
		</Routes>
	);
});

export default RouterProvider;
