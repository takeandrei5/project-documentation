import type { NodeModel } from '@minoru/react-dnd-treeview';

export type TreeDataValues = {
	isDeleted: boolean;
	iconName: string;
  isCreating?: boolean;
  content?: string;
};

export type TreeDataProps = {
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void;
};
