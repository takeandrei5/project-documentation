import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { Dispatch, SetStateAction } from 'react';

export type TreeDataValues = {
	iconName?: string;
  link: string;
};

export type TreeDataProps = {
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: Dispatch<SetStateAction<NodeModel<TreeDataValues>[]>>;
};
