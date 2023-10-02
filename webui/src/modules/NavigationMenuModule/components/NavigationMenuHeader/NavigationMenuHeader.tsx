import { List } from '@mui/material';
import { NavigationMenuItem } from '../NavigationMenuItem';
import { useNavigationMenuHeader } from './hooks';

const NavigationMenuHeader: React.FC = () => {
	const { onClickHandler } = useNavigationMenuHeader();

	return (
		<List sx={{ padding: 0 }}>
			<NavigationMenuItem icon='face' onClick={onClickHandler} text="Alin's Notion" />
			<NavigationMenuItem icon='folder_open' onClick={onClickHandler} text='Shared' />
		</List>
	);
};
export default NavigationMenuHeader;
