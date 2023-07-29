import { type Dispatch } from 'react';
import { type NodeModel } from '../../types';

export type AddNewFileProps = {
	setTreeData: Dispatch<React.SetStateAction<NodeModel[]>>;
	nodeId: number;
	treeData: NodeModel[];
};