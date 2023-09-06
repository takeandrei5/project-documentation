import { MainLayout } from '../MainLayout';
import { Outlet } from 'react-router-dom';

const MainLayoutOutlet:React.FC = () => {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
};
export default MainLayoutOutlet;