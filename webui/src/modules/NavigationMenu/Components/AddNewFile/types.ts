import type { NodeModel } from '@minoru/react-dnd-treeview';
import { type Dispatch } from 'react';
import type { TreeDataValues } from '../../types';

export type AddNewFileProps = {
	setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>;
	nodeId: number;
	treeData: NodeModel<TreeDataValues>[];
};