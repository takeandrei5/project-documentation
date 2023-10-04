import { Box, Divider, type Theme } from '@mui/material';
import { NavigationMenuBody, NavigationMenuFooter, NavigationMenuHeader } from '../services';
import { useNavigationMenu } from './hooks';

const NavigationMenuContainer: React.FC = () => {
	const { isLoading, projectData, refetchProjectData, setTreeDataHandler, treeData } = useNavigationMenu();

	return (
		<Box
			sx={(theme: Theme) => ({
				backgroundColor: theme.palette.common.white,
				padding: '0.94rem 1rem'
			})}>
			<NavigationMenuHeader isLoading={isLoading} projectName={projectData?.name || ''} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuBody isLoading={isLoading} treeData={treeData} setTreeData={setTreeDataHandler} refreshTreeData={refetchProjectData} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuFooter isLoading={isLoading} />
		</Box>
	);
};

export default NavigationMenuContainer;
