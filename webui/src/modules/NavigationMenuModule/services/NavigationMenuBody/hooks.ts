import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPageApi } from '../../../../api/webapi/pages';
import type { CreatePageRequest } from '../../../../api/webapi/pages/types';
import type { TreeDataValues } from '../../types';

const useNavigationMenuBody = (treeData: NodeModel<TreeDataValues>[], setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void, refreshTreeData: () => void) => {
	const navigate = useNavigate();

	const { mutate: createPageMutate } = useMutation((data: CreatePageRequest) => createPageApi(data, params.projectId!, params.organizationId!), {
		onSuccess: () => refreshTreeData()
	});

	const params = useParams<{ pageId: string; projectId: string; organizationId: string }>();
	const [selectedTreeNode, setSelectedTreeNode] = useState<string | null>(params.pageId || null);

	const onPageClickedHandler = (nodeId: string): void => {
		setSelectedTreeNode(nodeId);
		navigate(`/organizations/${params.organizationId!}/projects/${params.projectId!}/project-documentation/pages/${nodeId}`);
	};

	const onDropHandler = (newTreeData: NodeModel<TreeDataValues>[]): void => {
		setTreeData(newTreeData);
	};

	const onAddNewPageHandler = (parentId?: string) => {
		const newTreeData: NodeModel<TreeDataValues>[] = [
			...treeData,
			{
				id: `new-page-${Date.now()}}`,
				parent: parentId || '0',
				text: 'untitled',
				droppable: true,
				data: {
					iconName: 'text_snippet_outlined',
					isDeleted: false
				}
			}
		];
		setTreeData(newTreeData);
		createPageMutate({
			name: 'untitled',
			iconName: 'text_snippet_outlined',
			parentId
		});
	};

	return { onAddNewPageHandler, onPageClickedHandler, onDropHandler, selectedTreeNode };
};

export { useNavigationMenuBody };
