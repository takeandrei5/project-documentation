import { Box, Divider, type Theme } from '@mui/material';
import { NavigationMenuBody, NavigationMenuFooter, NavigationMenuHeader } from '../services';
import { useNavigationMenu } from './hooks';

const NavigationMenuContainer: React.FC = () => {
	const { isLoading, projectData, refetchProjectData, setTreeDataHandler, treeData } = useNavigationMenu();

	if (isLoading || !projectData) {
		return <div>Loading...</div>;
	}

	return (
		<Box
			sx={(theme: Theme) => ({
				backgroundColor: theme.palette.common.white,
				padding: '0.94rem 1rem'
			})}>
			<NavigationMenuHeader projectData={projectData} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuBody treeData={treeData} setTreeData={setTreeDataHandler} refreshTreeData={refetchProjectData} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuFooter />
		</Box>
	);
};

export default NavigationMenuContainer;
