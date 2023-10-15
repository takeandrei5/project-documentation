import { Box, Divider, type Theme } from '@mui/material';
import { NavigationMenuBody, NavigationMenuFooter, NavigationMenuHeader } from '../services';
import { useNavigationMenu } from './hooks';

const NavigationMenuContainer: React.FC = () => {
	const { isLoading, pages, projectName, refetchProjectData } = useNavigationMenu();

	return (
		<Box
			sx={(theme: Theme) => ({
				backgroundColor: theme.palette.common.white,
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
				maxHeight: '100%',
				padding: '0.94rem 1rem'
			})}>
			<NavigationMenuHeader isLoading={isLoading} projectName={projectName} />
			<NavigationMenuBody isLoading={isLoading} pages={pages} refreshTreeData={refetchProjectData} />
			<NavigationMenuFooter isLoading={isLoading} />
		</Box>
	);
};

export default NavigationMenuContainer;
