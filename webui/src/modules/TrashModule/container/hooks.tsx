import type { NodeModel } from '@minoru/react-dnd-treeview';
import _ from 'lodash';
import type { TreeDataValues } from '../../NavigationMenuModule/types';
import TreeNode from '../views/TreeNode/TreeNode';
import type { TrashTreeDataValues } from './types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deletePageApi, updateOnePageApi } from '../../../api/webapi/pages';
import type { UpdatePageRequest } from '../../../api/webapi/pages/types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const useTrash = () => {
  const queryClient = useQueryClient();
	const treeData = useAppSelector((state) => state.tree);

	const params = useParams<{ organizationId: string; projectId: string }>();

	const { mutate: updatePageMutate } = useMutation(({ data, nodeId }: { data: UpdatePageRequest; nodeId: string }) =>
		updateOnePageApi(data, nodeId, params.projectId!, params.organizationId!)
	);
	const { mutate: deletePageMutate } = useMutation((nodeId: string) => deletePageApi(nodeId, params.projectId!, params.organizationId!));

	const arrayToTree = (data: NodeModel<TreeDataValues>[]): TrashTreeDataValues[] => {
		const tree: TrashTreeDataValues[] = [];
		const map: { [key: string | number]: TrashTreeDataValues } = {};

		const clonedTree = _.cloneDeep(data);

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

	const onPermanentDeleteClickedHandler = (node: TrashTreeDataValues): void => {
		deletePageMutate(node.id as string);
		// dispatch(setTree([...treeData.filter((item: NodeModel<TreeDataValues>) => item.id !== node.id)]));
	};

	const onRecoverFileClickedHandler = (item: TrashTreeDataValues): void => {
		const recoveredNodes = treeToArray(item);

		const ids = recoveredNodes.map((node: NodeModel<TreeDataValues>) => node.id as string);
		const newTree = _.cloneDeep(treeData);

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

		// dispatch(setTree(newTree));
	};

	const renderTree = (nodes: TrashTreeDataValues[], level = 0): JSX.Element[] => {
		const treeArrayNodes: JSX.Element[] = [];

		const renderTreeRecursive = (nodes: TrashTreeDataValues[], level = 0): void => {
			for (const node of nodes) {
				const nodeComponent = (
					<TreeNode
						key={node.id}
						node={node}
						level={level}
						onPermanentDeleteClickedHandler={onPermanentDeleteClickedHandler}
						onRecoverFileClickedHandler={onRecoverFileClickedHandler}
					/>
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

	const trashData = treeData.filter((node: NodeModel<TreeDataValues>) => node.data && node.data.isDeleted);
  const treeNodes = renderTree(arrayToTree(trashData));

	return { treeNodes };
};

export { useTrash };
