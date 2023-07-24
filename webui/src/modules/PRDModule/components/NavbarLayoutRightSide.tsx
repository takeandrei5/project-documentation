import { Box } from '@mui/material';

import { TextEditor } from './TextEditor';

const NavbarLayoutRightSide: React.FC = () => {
	return (
		<Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%', maxHeight: '100%', width: '100%', maxWidth: '100%', bgcolor: '#FFFFFF', padding: '2rem' }}>
			<TextEditor />
		</Box>
	);
};

export default NavbarLayoutRightSide;
