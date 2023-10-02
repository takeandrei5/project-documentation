import type { NodeModel } from '@minoru/react-dnd-treeview';

export type TreeDataValues = {
	link: string;
	isDeleted: boolean;
	isEditable?: boolean;
	iconName?: string;
};

export type TreeDataProps = {
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void;
};
