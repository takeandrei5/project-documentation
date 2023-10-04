import { Box } from '@mui/material';
import { TextEditor } from '../services';
import { useProjectDocumentation } from './hooks';

const ProjectDocumentation: React.FC = () => {
	const { pageDetails, isLoading, debouncedUpdatePageMutate } = useProjectDocumentation();

	if (!pageDetails) {
		return null;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Box sx={{ height: '100%', width: '100%', bgcolor: '#FFFFFF' }}>
			<TextEditor content={pageDetails.content} onContentChangedHandler={debouncedUpdatePageMutate} />
		</Box>
	);
};

export default ProjectDocumentation;
