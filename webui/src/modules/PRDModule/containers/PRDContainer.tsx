import TextEditor from '../components/TextEditor';
import { Box } from '@mui/material';

const PRDContainer:React.FC = () => {
	return (
		<Box sx={{ height: '100%', width: '100%', bgcolor: '#FFFFFF' }}>
			<TextEditor />
		</Box>
	);
};

export default PRDContainer;
