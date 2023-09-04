import type { TreeDataProps, TreeDataValues } from '../../types';
import type { NodeModel } from '@minoru/react-dnd-treeview';

export type EditNodeProps = TreeDataProps & {
	node: NodeModel<TreeDataValues>;
	editNodeRef?: any;
	isOpen: boolean;
	onToggle: () => void;
};
