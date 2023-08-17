import { TreeDataProps, TreeDataValues } from '../../types';
import { NodeModel } from '@minoru/react-dnd-treeview';

export type EditNodeProps = Pick<TreeDataProps, 'treeData' | 'setTreeData'> & {
	node:NodeModel<TreeDataValues>;
}