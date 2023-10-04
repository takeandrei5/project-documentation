import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { readOnePageApi, updatePageApi } from '../../../api/webapi/pages';
import type { UpdatePageRequest } from '../../../api/webapi/pages/types';

const useProjectDocumentation = () => {
  const params = useParams<{ organizationId: string; projectId: string; pageId: string }>();
	const { data: pageDetails, isLoading } = useQuery(['page', params.organizationId, params.projectId, params.pageId], () =>
		readOnePageApi(params.pageId!, params.projectId!, params.organizationId!), {
      enabled: !!params.pageId
    }
	);
	const { mutate: updatePageMutate } = useMutation((data: UpdatePageRequest) => updatePageApi(data, params.pageId!, params.projectId!, params.organizationId!));

	const debouncedUpdatePageMutate = useDebouncedCallback((content: string) => {
		if (!pageDetails) {
			return;
		}

		updatePageMutate({
			iconName: pageDetails.data.iconName,
			isSoftDeleted: pageDetails.data.isSoftDeleted,
			name: pageDetails.data.name,
			content,
			parentId: pageDetails.data.parentId
		});
	}, 500);

  return { pageDetails: pageDetails?.data, isLoading, debouncedUpdatePageMutate }
};

export { useProjectDocumentation }