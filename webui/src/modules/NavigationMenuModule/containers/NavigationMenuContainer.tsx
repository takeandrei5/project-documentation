import { type NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Divider, type Theme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import type { PageDto } from '../../../api/webapi/pages/types';
import readOneProjectApi from '../../../api/webapi/projects/readOne';
import type { ProjectDto } from '../../../api/webapi/projects/types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setTree } from '../../../redux/slices/tree/treeSlice';
import { NavigationMenuBody, NavigationMenuFooter, NavigationMenuHeader } from '../components';
import type { TreeDataValues } from '../types';

const NavigationMenuContainer: React.FC = () => {
	const treeData = useAppSelector((state) => state.tree);
	const dispatch = useAppDispatch();
	const setTreeDataHandler = (treeData: NodeModel<TreeDataValues>[]): void => {
		dispatch(setTree(treeData));
	};

	const params = useParams<{projectId: string; organizationId: string;}>();
	const { data: projectData, isLoading, refetch: refetchProjectData } = useQuery(['project_info', params['projectId'], params['organizationId']], () =>
		readOneProjectApi(params.projectId!, params.organizationId!), {
      onSuccess: (projectDto: AxiosResponse<ProjectDto>) => {
        const treeData: NodeModel<TreeDataValues>[] = projectDto.data.pages.map((page: PageDto): NodeModel<TreeDataValues> => {
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
          }
        })
        dispatch(setTree(treeData));
      },
    }
	);

  const refreshTreeData = (): void => {
    refetchProjectData();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

	console.log(projectData);
	return (
		<Box
			sx={(theme: Theme) => ({
				backgroundColor: theme.palette.common.white,
				padding: '0.94rem 1rem'
			})}>
			<NavigationMenuHeader />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuBody treeData={treeData} setTreeData={setTreeDataHandler} refreshTreeData={refreshTreeData} />
			<Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
			<NavigationMenuFooter />
		</Box>
	);
};

export default NavigationMenuContainer;
