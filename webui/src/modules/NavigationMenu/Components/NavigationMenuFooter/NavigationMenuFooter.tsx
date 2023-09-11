import { List } from '@mui/material';
import { useNavigationMenuFooter } from './hooks';

const NavigationMenuFooter: React.FC = () => {
	const renderItems = useNavigationMenuFooter();

	return <List>{renderItems()}</List>;
};

export default NavigationMenuFooter;
