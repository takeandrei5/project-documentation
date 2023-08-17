import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { Dispatch, SetStateAction } from 'react';

export type TreeDataValues = {
	iconName?:string;
	link:string;
	isEditable:boolean;
};

export type TreeDataProps = {
	treeData:NodeModel<TreeDataValues>[];
	trashTreeData:Dispatch<SetStateAction<NodeModel<TreeDataValues>[]>>;
	setTreeData:Dispatch<SetStateAction<NodeModel<TreeDataValues>[]>>;
	setTrashTreeData:Dispatch<SetStateAction<NodeModel<TreeDataValues>[]>>;
};
