import { Box, Skeleton } from '@mui/material';
import { TextEditor } from '../services';
import { useProjectDocumentation } from './hooks';

const ProjectDocumentation: React.FC = () => {
	const { pageDetails, isLoading, debouncedUpdatePageMutate } = useProjectDocumentation();

	console.log(isLoading, pageDetails);

	if (!pageDetails) {
		return null;
	}

	return (
		<Box sx={{ height: '100%', width: '100%', bgcolor: '#FFFFFF', overflow: 'auto' }}>
			{!isLoading ? (
				<TextEditor content={pageDetails!.content} onContentChangedHandler={debouncedUpdatePageMutate} />
			) : (
				<Box sx={{ display: 'flex', flexDirection: 'column', paddingY: '2rem', paddingX: '4rem', height: '100%', width: '100%', gap: '0.5rem' }}>
					<Skeleton animation='wave' variant='rounded' width='24rem' height='3rem' />
					<Skeleton animation='wave' variant='rounded' width='100%' sx={{ flex: 1 }} />
				</Box>
			)}
		</Box>
	);
};

export default ProjectDocumentation;
