import type { NodeModel } from '@minoru/react-dnd-treeview';
import { Box } from '@mui/material';
import _ from 'lodash';
import type { TreeDataValues } from '../NavigationMenu/types';
import TreeNode from './TreeNode/TreeNode';
import type { TrashTreeDataValues } from './types';

const useTrashContainer = () => {
	const arrayToTree = (data: NodeModel<TreeDataValues>[]): TrashTreeDataValues[] => {
		const tree: TrashTreeDataValues[] = [];
		const map: { [key: string | number]: TrashTreeDataValues } = {};

		const clonedTree: NodeModel<TreeDataValues>[] = _.cloneDeep(data);

		clonedTree.forEach((treeItem: NodeModel<TreeDataValues>) => {
			const newTrashItem: TrashTreeDataValues = { ...treeItem, children: [] };

			map[newTrashItem.id] = newTrashItem;

			if (newTrashItem.parent === '0') {
				tree.push(newTrashItem);
			} else if (map[newTrashItem.parent]) {
				map[newTrashItem.parent].children.push(newTrashItem);
			}
		});

		return tree;
	};

	const renderTree = (nodes: TrashTreeDataValues[], level = 0): JSX.Element[] => {
		const treeArrayNodes: JSX.Element[] = [];

    const renderTreeRecursive = (nodes: TrashTreeDataValues[], level = 0) => {
			for (const node of nodes) {
				treeArrayNodes.push(
					<Box key={node.id} sx={{ marginLeft: `${20 * level}px` }}>
						<TreeNode treeNode={node} />
					</Box>
				);

				if (node.children) {
					renderTreeRecursive(node.children, level + 1);
				}
			}
		};

    renderTreeRecursive(nodes, level);

    return treeArrayNodes;
	};

	return { arrayToTree, renderTree };
};

export { useTrashContainer };
