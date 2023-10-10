import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPageApi } from '../../../../api/webapi/pages';
import type { CreatePageRequest, PageDto } from '../../../../api/webapi/pages/types';
import type { TreeDataValues } from '../../types';

const useNavigationMenuBody = (pages: PageDto[], refreshTreeData: () => void) => {
	const navigate = useNavigate();
	const [treeData, setTreeData] = useState<NodeModel<TreeDataValues>[]>(pages.map(mapPageDtoToNodeModel));

	const { mutate: createPageMutate } = useMutation((data: CreatePageRequest) => createPageApi(data, params.projectId!, params.organizationId!), {
		onSuccess: refreshTreeData
	});

	const params = useParams<{ pageId: string; projectId: string; organizationId: string }>();
	const [selectedTreeNode, setSelectedTreeNode] = useState<string | null>(params.pageId || null);

	useEffect(() => {
		setTreeData(pages.map(mapPageDtoToNodeModel));
	}, [pages]);

	function mapPageDtoToNodeModel(page: PageDto): NodeModel<TreeDataValues> {
		const nodeModel: NodeModel<TreeDataValues> = {
			id: page.id,
			parent: page.parentId ?? '0',
			text: page.name,
			droppable: true,
			data: {
				content: page.content,
				isDeleted: page.isSoftDeleted,
				iconName: page.iconName
			}
		};

		return nodeModel;
	}

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
				id: `new-page-${Date.now()}`,
				parent: parentId || '0',
				text: 'untitled',
				droppable: true,
				data: {
					iconName: 'text_snippet_outlined',
					isDeleted: false,
					isCreating: true
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

	return { onAddNewPageHandler, onPageClickedHandler, onDropHandler, selectedTreeNode, setTreeData, treeData };
};

export { useNavigationMenuBody };
