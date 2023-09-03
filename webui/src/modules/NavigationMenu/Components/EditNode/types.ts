import { TreeDataProps, TreeDataValues } from '../../types';
import { NodeModel } from '@minoru/react-dnd-treeview';

export type EditNodeProps = TreeDataProps & {
	node:NodeModel<TreeDataValues>;
	editNodeRef?:any
	isOpen:boolean
	onToggle:() => void
}

