import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { Dispatch, SetStateAction } from 'react';

export type TreeDataValues = {
	link:string;
	isDeleted:boolean;
	isEditable?:boolean;
	iconName?:string;
};

export type TreeDataProps = {
	treeData:NodeModel<TreeDataValues>[];
	setTreeData:(treeData:NodeModel<TreeDataValues>[]) => void;
};
