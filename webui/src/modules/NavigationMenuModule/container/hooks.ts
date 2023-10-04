import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import type { PageDto } from '../../../api/webapi/pages/types';
import { readOneProjectApi } from '../../../api/webapi/projects';
import type { ProjectDto } from '../../../api/webapi/projects/types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setTree } from '../../../redux/slices/tree/treeSlice';
import type { TreeDataValues } from '../types';

const useNavigationMenu = () => {
	const dispatch = useAppDispatch();
	const treeData = useAppSelector((state) => state.tree);
	const setTreeDataHandler = (treeData: NodeModel<TreeDataValues>[]): void => {
		dispatch(setTree(treeData));
	};

	const params = useParams<{ projectId: string; organizationId: string }>();
	const {
		data: projectData,
		isLoading,
		refetch: refetchProjectData
	} = useQuery(['project_info', params['projectId'], params['organizationId']], () => readOneProjectApi(params.projectId!, params.organizationId!), {
		onSuccess: (projectDto: AxiosResponse<ProjectDto>) => {
			const treeData = projectDto.data.pages.map(mapPageDtoToNodeModel);
			dispatch(setTree(treeData));
		}
	});

	const mapPageDtoToNodeModel = (page: PageDto): NodeModel<TreeDataValues> => {
		return {
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
	};

	return { projectData: projectData?.data, isLoading, refetchProjectData, setTreeDataHandler, treeData };
};

export { useNavigationMenu };