import { List } from '@mui/material';
import { NavigationMenuItem } from '../../views/NavigationMenuItem';
import { useNavigationMenuHeader } from './hooks';
import type { NavigationMenuHeaderProps } from './types';

const NavigationMenuHeader: React.FC<NavigationMenuHeaderProps> = ({ isLoading, projectName }) => {
	const { onProjectNameClickedHandler, onClickHandler } = useNavigationMenuHeader();

	return (
		<List sx={{ padding: 0 }}>
			<NavigationMenuItem isLoading={isLoading} icon='face' onClick={onProjectNameClickedHandler} text={projectName} />
			<NavigationMenuItem isLoading={isLoading} icon='folder_open' onClick={onClickHandler} text='Shared' />
		</List>
	);
};
export default NavigationMenuHeader;
