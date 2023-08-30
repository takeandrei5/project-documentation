import type { NodeModel } from '@minoru/react-dnd-treeview';
import { type Dispatch } from 'react';
import type { TreeDataValues } from '../../types';

export type VerticalMenuProps = {
	nodeId: string;
	text: string;
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>;
	link: string;
};

export type SnackbarMessages = {
	copy: string;
	delete: string;
	duplicate: string;
	rename: string;
};
