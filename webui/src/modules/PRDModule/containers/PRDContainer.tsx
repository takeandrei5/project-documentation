import { Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { readOnePageApi, updatePageApi } from '../../../api/webapi/pages';
import type { UpdatePageRequest } from '../../../api/webapi/pages/types';
import { TextEditor } from '../components';
import { useDebouncedCallback } from 'use-debounce';

const PRDContainer: React.FC = () => {
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

	if (!pageDetails) {
		return null;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}


	return (
		<Box sx={{ height: '100%', width: '100%', bgcolor: '#FFFFFF' }}>
			<TextEditor content={pageDetails.data.content} onContentChangedHandler={debouncedUpdatePageMutate} />
		</Box>
	);
};

export default PRDContainer;
