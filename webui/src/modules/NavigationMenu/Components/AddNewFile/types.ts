import type { Dispatch } from 'react';
import type { TreeDataValues } from '../../types';
import type { NodeModel } from '@minoru/react-dnd-treeview';

export type AddNewFileProps = {
	setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>;
	nodeId: number;
	treeData: NodeModel<TreeDataValues>[];
};