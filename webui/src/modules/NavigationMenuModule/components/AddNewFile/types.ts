import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { TreeDataValues } from '../../types';

export type AddNewFileProps = {
	nodeId: string;
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void;
};