import { NavbarLayout } from '../NavbarLayout';
import { Outlet } from 'react-router-dom';

const NavigationLayoutOutlet:React.FC = () => {
	return (
		<NavbarLayout>
			<Outlet />
		</NavbarLayout>
	);
};
export default NavigationLayoutOutlet;