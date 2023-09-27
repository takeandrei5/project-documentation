import type { NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Icon, Theme } from '@mui/material';
import _ from 'lodash';
import { setTrash } from '../../redux/slices/trash/trashSlice';
import { setTree } from '../../redux/slices/tree/treeSlice';
import type { TreeDataValues } from '../NavigationMenu/types';
import TreeNode from './TreeNode/TreeNode';
import type { TrashTreeDataValues } from './types';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const useTrashContainer = () => {
	const dispatch = useAppDispatch();
	const trashData: NodeModel<TreeDataValues>[] = useAppSelector((state) => state.trash);

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

	const onRecoveryFilesHandler = (item: TrashTreeDataValues) => {
		const recoveredFiles: TrashTreeDataValues[] = [];

		const recoveredRecursiveHandler = (item: TrashTreeDataValues) => {
			recoveredFiles.push(item);
			if (item.children && item.children.length > 0) {
				for (const child of item.children) {
					recoveredRecursiveHandler(child);
				}
			}
		};

		recoveredRecursiveHandler(item);
		const ids = recoveredFiles.map((item) => item.id);
		const newTree = _.cloneDeep(trashData);

		newTree.forEach((item) => {
			if (ids.includes(item.id) && item.data && item.data.isDeleted) {
				item.data.isDeleted = false;
				item.parent = '0';
			}
		});

		dispatch(setTree(newTree));
		dispatch(setTrash(newTree));
	};
	const renderTree = (nodes: TrashTreeDataValues[], level = 0): JSX.Element[] => {
		const treeArrayNodes: JSX.Element[] = [];

		const renderTreeRecursive = (nodes: TrashTreeDataValues[], level = 0) => {
			for (const node of nodes) {
				const nodeComponent = (
					<Box key={node.id} sx={{ marginLeft: `${20 * level}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<TreeNode treeNode={node} />
						{node.data && node.data.isDeleted && (
							<Box component={'span'}>
								<Icon
									sx={(theme: Theme) => ({
										color: theme.palette.greenDark[80],
										cursor: 'pointer',
										'&:hover': { color: theme.palette.greenDark[100] }
									})}
									onClick={() => onRecoveryFilesHandler(node)}>
									undo
								</Icon>
								<Icon
									sx={(theme: Theme) => ({
										color: theme.palette.red[60],
										cursor: 'pointer',
										'&:hover': { color: theme.palette.red[80] }
									})}>
									<Icon>delete_forever_outlined</Icon>
								</Icon>
							</Box>
						)}
					</Box>
				);
				treeArrayNodes.push(nodeComponent);
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
