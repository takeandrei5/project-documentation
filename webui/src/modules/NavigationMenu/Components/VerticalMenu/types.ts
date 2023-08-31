import type { NodeModel } from '@minoru/react-dnd-treeview';
import { type Dispatch } from 'react';
import type { TreeDataValues } from '../../types';

export type VerticalMenuProps = {
	nodeId: number;
	text: string;
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>;
};
