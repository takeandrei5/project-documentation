import { type NodeModel } from '@minoru/react-dnd-treeview';
import { Box } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import type { TreeDataValues } from '../NavigationMenu/types';
import _ from 'lodash';

const TrashContainer: React.FC = () => {
	const trashData: NodeModel<TreeDataValues>[] = useAppSelector((state) => state.trash);
	return (
		<Box sx={{ height: '100%', width: '100%', bgcolor: '#FFFFFF' }}>
			<TreeView initialData={trashData} />
		</Box>
	);
};

const TreeView = ({ initialData: data }: { initialData: NodeModel<TreeDataValues>[] }) => {
	function arrayToTree(data: NodeModel<TreeDataValues>[]) {
		let tree = [];
		let map = {};

		const temp = _.cloneDeep(data);

		temp.forEach((item) => {
			// Initialize the children array for the current item
			item['children'] = [];

			// If the map doesn't have the item's id as a key, create it.
			map[item.id] = item;

			// If the parent is 0, it's a root node, so push it to the tree.
			// Else, it's a child node, so push it to its parent's children array.
			if (item.parent === 0) {
				tree.push(item);
			} else if (map[item.parent]) {
				map[item.parent].children.push(item);
			}
		});

		return tree;
	}

	let arr = [];
	const renderTree = (nodes: any[], margin = 0) => {
    console.log(nodes);
		for (const i of nodes) {
			arr.push(<TreeNode key={i.id} node={i} margin={margin} />);

			if (i.children) {
				renderTree(i.children, margin + 20);
			}
		}
	};
	renderTree(arrayToTree(data));

	return <>{arr.map((node) => node)}</>;
};

const TreeNode = ({ node, margin }: { node: NodeModel<TreeDataValues>, margin: number }) => {
	const { text, data } = node;

	return <>{data?.isDeleted && <div style={{ marginLeft: `${margin}px`, width: '100%' }}>{text}</div>}</>;
};

export default TrashContainer;
