import { Route, Routes } from 'react-router-dom';
import { CreatePRDPage, HomePage, PRDPage, TrashPage } from '../../pages';
import { AuthenticationGuard } from '../../components';
import { MainLayoutOutlet } from '../../layouts/MainLayoutOutlet';
import { NavigationLayoutOutlet } from '../../layouts/NavigationLayoutOutlet';

const RouterProvider:React.FC = () => {
	return (
		<Routes>
			<Route element={<MainLayoutOutlet />}>
				<Route path='/' element={<HomePage />} />
				<Route path='/create-project-documentation' element={<AuthenticationGuard component={CreatePRDPage} />} />
			</Route>
			<Route element={<NavigationLayoutOutlet />}>
				<Route path='/project-documentation/:id' element={<AuthenticationGuard component={PRDPage} />} />
				<Route path='/project-documentation/:id/trash' element={<AuthenticationGuard component={TrashPage} />} />
			</Route>
			<Route path='*' element={<>Not found ...</>} />
		</Routes>
	);
};

export default RouterProvider;