import { type Dispatch } from 'react';
import { type NodeModel } from '../../types';

export type VerticalMenuProps = {
	setTreeData: Dispatch<React.SetStateAction<NodeModel[]>>;
	nodeId: number;
	text: string;
	treeData: NodeModel[];
};
