import type { NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Divider, useTheme, type Theme } from '@mui/material';
import { useState } from 'react';
import { NavigationMenuBody, NavigationMenuFooter, NavigationMenuHeader } from '../components';
import type { TreeDataValues } from '../types';
import { initialTreeData } from './constants';

const NavigationMenuContainer: React.FC = () => {
	const [treeData, setTreeData] = useState<NodeModel<TreeDataValues>[]>(initialTreeData);
	const theme: Theme = useTheme();

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.common.white,
				padding: '0.94rem 1rem'
			}}>
			<NavigationMenuHeader treeData={treeData} setTreeData={setTreeData} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuBody treeData={treeData} setTreeData={setTreeData} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuFooter />
		</Box>
	);
};

export default NavigationMenuContainer;
