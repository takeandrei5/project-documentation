import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { TreeDataValues } from '../../types';

export type TreeNodeProps = {
	node: NodeModel<TreeDataValues>;
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void;
	onClickHandler: (id: string) => void;
  onAddNewPageHandler: (parentId: string) => void;
	onToggle: () => void;
	depth: number;
	isOpen: boolean;
	isSelected: boolean;
  isCreating?: boolean;
};
