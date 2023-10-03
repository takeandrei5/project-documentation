import type { NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Icon, type Theme } from '@mui/material';
import _ from 'lodash';
import { setTree } from '../../redux/slices/tree/treeSlice';
import type { TreeDataValues } from '../NavigationMenuModule/types';
import TreeNode from './TreeNode/TreeNode';
import type { TrashTreeDataValues } from './types';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useMutation } from '@tanstack/react-query';
import type { UpdatePageRequest } from '../../api/webapi/pages/types';
import { deletePageApi, updatePageApi } from '../../api/webapi/pages';
import { useParams } from 'react-router-dom';

const useTrashContainer = () => {
	const dispatch = useAppDispatch();
	const treeData: NodeModel<TreeDataValues>[] = useAppSelector((state) => state.tree);
	const params = useParams<{ organizationId: string; projectId: string }>();
	const { mutate: updatePageMutate } = useMutation(({ data, nodeId }: { data: UpdatePageRequest; nodeId: string }) =>
		updatePageApi(data, nodeId, params.projectId!, params.organizationId!)
	);
	const { mutate: deletePageMutate } = useMutation((nodeId: string) => deletePageApi(nodeId, params.projectId!, params.organizationId!));

	const trashData: NodeModel<TreeDataValues>[] = treeData.filter((node: NodeModel<TreeDataValues>) => node.data && node.data.isDeleted);

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

	const treeToArray = (data: TrashTreeDataValues): NodeModel<TreeDataValues>[] => {
		const recoveredTree: NodeModel<TreeDataValues>[] = [];

		const recoverTreeRecursive = (data: TrashTreeDataValues): void => {
			if (!data.children || data.children.length === 0) {
				const { children, ...rest } = data;
				recoveredTree.push(rest);
				return;
			}

			data.children.forEach((node: TrashTreeDataValues) => {
				recoverTreeRecursive(node);
			});

			recoveredTree.push(data);
		};

		recoverTreeRecursive(data);

		return recoveredTree;
	};

	const onPermanentDeleteClickedHandler = (node: TrashTreeDataValues) => {
		deletePageMutate(node.id as string);
		dispatch(setTree([...treeData.filter((item: NodeModel<TreeDataValues>) => item.id !== node.id)]));
	};

	const onRecoverFileClickedHandler = (item: TrashTreeDataValues) => {
		const recoveredNodes: NodeModel<TreeDataValues>[] = treeToArray(item);

		const ids = recoveredNodes.map((node: NodeModel<TreeDataValues>) => node.id as string);
		const newTree: NodeModel<TreeDataValues>[] = _.cloneDeep(treeData);

		newTree.forEach((treeItem: NodeModel<TreeDataValues>) => {
			if (ids.includes(treeItem.id as string) && treeItem.data && treeItem.data.isDeleted) {
				treeItem.data.isDeleted = false;
				treeItem.parent = '0';

				updatePageMutate({
					data: { isSoftDeleted: treeItem.data.isDeleted, iconName: treeItem.data.iconName, name: treeItem.text, content: treeItem.data.content, parentId: undefined },
					nodeId: treeItem.id as string
				});
			}
		});

		dispatch(setTree(newTree));
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
									onClick={() => onRecoverFileClickedHandler(node)}>
									undo
								</Icon>
								<Icon
									sx={(theme: Theme) => ({
										color: theme.palette.red[60],
										cursor: 'pointer',
										'&:hover': { color: theme.palette.red[80] }
									})}
									onClick={() => onPermanentDeleteClickedHandler(node)}>
									delete_forever_outlined
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

	return { arrayToTree, renderTree, trashData };
};

export { useTrashContainer };
