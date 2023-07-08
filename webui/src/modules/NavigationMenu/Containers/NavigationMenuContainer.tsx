import { Box, Divider } from '@mui/material';
import { NavigationMenuHeader, NavigationMenuBody, NavigationMenuFooter } from '../Components';

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
