import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createPageApi } from '../../../../api/webapi/pages';
import type { CreatePageRequest } from '../../../../api/webapi/pages/types';
import type { TreeDataValues } from '../../types';

const useNavigationMenuBody = (setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void, refreshTreeData: () => void) => {
	const params = useParams<{pageId: string; projectId: string; organizationId: string}>();
	const [selectedTreeNode, setSelectedTreeNode] = useState<string | null>(params.pageId || null);
  const navigate = useNavigate();
	const { mutate: createPageMutate } = useMutation((data: CreatePageRequest) => createPageApi(data, params.projectId!, params.organizationId!), {
		onSuccess: (response: AxiosResponse) => {
      refreshTreeData();
		}
	});

	const onPageClickedHandler = (nodeId: string): void => {
		setSelectedTreeNode(nodeId);
    navigate(`/organizations/${params.organizationId!}/projects/${params.projectId!}/project-documentation/pages/${nodeId}`);
	};

	const onDropHandler = (newTreeData: NodeModel<TreeDataValues>[]): void => {
		setTreeData(newTreeData);
	};

	return { onNewPageClickedHandler: createPageMutate, onPageClickedHandler, onDropHandler, selectedTreeNode };
};

export { useNavigationMenuBody };
