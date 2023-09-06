import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { TreeDataValues } from '../../types';

export type TreeNodeProps = {
	node: NodeModel<TreeDataValues>;
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: React.Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>;
	onClickHandler: (id: string) => void;
	onToggle: () => void;
	depth: number;
	isOpen: boolean;
	isSelected: boolean;
};
