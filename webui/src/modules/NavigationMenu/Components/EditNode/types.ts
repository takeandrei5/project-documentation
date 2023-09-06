import type { RefObject } from 'react';
import type { TreeDataProps, TreeDataValues } from '../../types';
import type { NodeModel } from '@minoru/react-dnd-treeview';

export type EditNodeProps = TreeDataProps & {
	node: NodeModel<TreeDataValues>;
	editNodeRef?: RefObject<HTMLInputElement>;
	isOpen: boolean;
	onToggle: () => void;
};
