import type { NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Divider, useTheme, type Theme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setTree } from '../../../redux/slices/tree/treeSlice';
import { NavigationMenuBody, NavigationMenuFooter, NavigationMenuHeader } from '../components';
import type { TreeDataValues } from '../types';

const NavigationMenuContainer: React.FC = () => {
	const treeData = useAppSelector((state) => state.tree);
	const theme: Theme = useTheme();
	const dispatch = useAppDispatch();
	const setTreeDataHandler = (treeData: NodeModel<TreeDataValues>[]): void => {
		dispatch(setTree(treeData));
	};

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.common.white,
				padding: '0.94rem 1rem'
			}}>
			<NavigationMenuHeader treeData={treeData} setTreeData={setTreeDataHandler} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuBody treeData={treeData} setTreeData={setTreeDataHandler} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuFooter />
		</Box>
	);
};

export default NavigationMenuContainer;
