import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useState } from 'react';
import type { TreeDataValues } from '../../types';

const useNavigationMenuBody = (setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void) => {
	const [selectedTreeNode, setSelectedTreeNode] = useState<string | null>(null);

	const onClickHandler = (nodeId: string): void => {
		setSelectedTreeNode(nodeId);
	};

	const onDropHandler = (newTreeData: NodeModel<TreeDataValues>[]): void => {
		setTreeData(newTreeData);
	};

	return { onClickHandler, onDropHandler, selectedTreeNode };
};

export { useNavigationMenuBody };
