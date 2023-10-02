import { List } from '@mui/material';
import { useNavigationMenuFooter } from './hooks';

const NavigationMenuFooter: React.FC = () => {
	const renderItems = useNavigationMenuFooter();

	return <List sx={{ padding: 0 }}>{renderItems()}</List>;
};

export default NavigationMenuFooter;
