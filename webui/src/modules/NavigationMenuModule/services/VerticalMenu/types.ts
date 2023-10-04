import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { TreeDataValues } from '../../types';

export type VerticalMenuProps = {
	nodeId: string;
	text: string;
	treeData: NodeModel<TreeDataValues>[];
	setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void;
	link: string;
  onRenameItemClickedCallback: () => void;
};

export type SnackbarMessages = {
	copy: string;
};
