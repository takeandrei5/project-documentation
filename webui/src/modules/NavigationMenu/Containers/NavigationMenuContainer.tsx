import { Box, Divider } from '@mui/material';
import { NavigationMenuHeader, NavigationMenuBody, NavigationMenuFooter } from '../components';

const NavMenu: React.FC = () => {
	return (
		<Box>
			<NavigationMenuHeader />
			<NavigationMenuBody />
			<Divider />
			<NavigationMenuFooter />
		</Box>
	);
};

export default NavMenu;
