import { NavbarLayout } from '../NavbarLayout';
import { Outlet } from '@mui/icons-material';

const NavigationLayoutOutlet:React.FC = () => {
	return (
		<NavbarLayout>
			<Outlet />
		</NavbarLayout>
	);
};
export default NavigationLayoutOutlet;