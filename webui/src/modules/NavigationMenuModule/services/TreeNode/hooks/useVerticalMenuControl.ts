import type { NodeModel } from '@minoru/react-dnd-treeview';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from '../../../../../hooks';
import type { TreeDataValues } from '../../../types';
import { ToastMessages } from '../types';

const useVerticalMenuControl = (treeData: NodeModel<TreeDataValues>[], setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void, node: NodeModel) => {
	const { copyToClipboard } = useCopyToClipboard();
	const params = useParams<{ pageId: string; projectId: string; organizationId: string }>();

	const deleteItem = (data: NodeModel<TreeDataValues>[], nodeId: string): void => {
		data.forEach((item: NodeModel<TreeDataValues>) => {
			if (item.id === nodeId && item.data) {
				item.data.isDeleted = true;
			}

			if (item.parent === nodeId && item.data) {
				deleteItem(data, item.id.toString());
			}
		});
	};

	// const duplicateNode = (nodeId: string, parentId: string | null = null): NodeModel<TreeDataValues>[] => {
	// 	const selectedNode: NodeModel<TreeDataValues> | undefined = treeData.find((item) => item.id === nodeId); //PROJECT MANAGEMENT node

	// 	if (!selectedNode) {
	// 		return [];
	// 	}

	// 	const newSelectedNodeId: string = uuidv4();
	// 	const newSelectedNode: NodeModel<TreeDataValues> = { ...selectedNode, id: newSelectedNodeId, parent: parentId || selectedNode.parent, text: `${selectedNode.text} (copy)` };

	// 	let newNodes: NodeModel<TreeDataValues>[] = [newSelectedNode];
	// 	treeData
	// 		.filter((item: NodeModel<TreeDataValues>) => item.parent === selectedNode.id)
	// 		.forEach((item: NodeModel<TreeDataValues>) => {
	// 			newNodes = [...newNodes, ...duplicateNode(item.id.toString(), newSelectedNodeId.toString())];
	// 		});

	// 	return newNodes;
	// };

	const onCopyItemClickedHandler = async (): Promise<void> => {
		const link = `${window.location.origin}/organizations/${params.organizationId}/projects/${params.projectId}/pages/${params.pageId}`;
		const response = await copyToClipboard(link);

		if (response.status === 'success') {
			toast(ToastMessages.copy, {
				type: 'success'
			});

			return;
		}

		toast(ToastMessages.error, {
			type: 'error'
		});
	};

	const onSoftDeleteItemHandler = (): void => {
		const newTreeData: NodeModel<TreeDataValues>[] = _.cloneDeep(treeData);

		deleteItem(newTreeData, node.id as string);
		setTreeData(newTreeData);

		toast(ToastMessages.delete, {
			type: 'success'
		});
	};

	return { onCopyItemClickedHandler, onSoftDeleteItemHandler };
};

export { useVerticalMenuControl };
