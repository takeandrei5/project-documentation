import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPageApi, updateManyPageApi } from '../../../../api/webapi/pages';
import type { CreatePageRequest, PageDto, UpdateManyPageRequest } from '../../../../api/webapi/pages/types';
import type { TreeDataValues } from '../../types';

const useNavigationMenuBody = (pages: PageDto[], refreshTreeData: () => void) => {
	const navigate = useNavigate();
	const [treeData, setTreeData] = useState<NodeModel<TreeDataValues>[]>(pages.map(mapPageDtoToNodeModel));

	const { mutate: createPageMutate } = useMutation((data: CreatePageRequest) => createPageApi(data, params.projectId!, params.organizationId!), {
		onSuccess: refreshTreeData
	});

	const { mutate: updateManyMutate } = useMutation((data: UpdateManyPageRequest[]) => updateManyPageApi(data, params.projectId!, params.organizationId!), {
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

	function mapNodeModelToUpdateManyPageRequest(nodeModel: NodeModel<TreeDataValues>): UpdateManyPageRequest {
		const updatePageRequest: UpdateManyPageRequest = {
      pageId: nodeModel.id as string,
			name: nodeModel.text,
			iconName: nodeModel.data!.iconName,
			isSoftDeleted: nodeModel.data!.isDeleted,
			content: nodeModel.data!.content,
			parentId: (nodeModel.parent as string) === '0' ? undefined : (nodeModel.parent as string)
		};

		return updatePageRequest;
	}

	const onPageClickedHandler = (nodeId: string): void => {
		setSelectedTreeNode(nodeId);
		navigate(`/organizations/${params.organizationId!}/projects/${params.projectId!}/project-documentation/pages/${nodeId}`);
	};

	const onUpdateTreeHandler = (newTreeData: NodeModel<TreeDataValues>[]): void => {
		setTreeData(newTreeData);

		updateManyMutate(newTreeData.map(mapNodeModelToUpdateManyPageRequest));
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

	return { onAddNewPageHandler, onPageClickedHandler, onUpdateTreeHandler, selectedTreeNode, setTreeData, treeData };
};

export { useNavigationMenuBody };
