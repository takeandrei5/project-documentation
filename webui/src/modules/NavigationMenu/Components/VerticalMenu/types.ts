import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { TreeDataValues } from '../../types';

export type VerticalMenuProps = {
	nodeId: string;
	text: string;
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void;
	link: string;
};

export type SnackbarMessages = {
	copy: string;
	delete: string;
	duplicate: string;
	rename: string;
};
