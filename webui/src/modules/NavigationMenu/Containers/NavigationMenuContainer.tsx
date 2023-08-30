import type { NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Divider } from '@mui/material';
import { useState } from 'react';
import { NavigationMenuBody, NavigationMenuFooter, NavigationMenuHeader } from '../components';
import type { TreeDataValues } from '../types';
import { initialTreeData } from './constants';

const NavigationMenuContainer: React.FC = () => {
	const [treeData, setTreeData] = useState<NodeModel<TreeDataValues>[]>(initialTreeData);

	return (
		<Box>
			<NavigationMenuHeader treeData={treeData} setTreeData={setTreeData} />
			<NavigationMenuBody treeData={treeData} setTreeData={setTreeData} />
			<Divider />
			<NavigationMenuFooter />
		</Box>
	);
};

export default NavigationMenuContainer;
