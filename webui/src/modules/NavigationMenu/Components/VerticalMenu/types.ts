import { type NodeModel } from '@minoru/react-dnd-treeview';
import { type Dispatch } from 'react';
import { type TreeDataValues } from '../../types';

export type VerticalMenuProps = {
	setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>;
	nodeId: number;
	text: string;
	treeData: NodeModel<TreeDataValues>[];
};

export type SnackbarMessages = {
  copy: string;
  delete: string;
  duplicate: string;
  rename: string;
}