import { Box } from '@mui/material';

import TextEditor from './TextEditor';

const NavbarLayoutRightSide: React.FC = () => {
	return (
		<Box sx={{ height: '100%', width: '100%', bgcolor: '#FFFFFF' }}>
      <TextEditor />
		</Box>
	);
};

export default NavbarLayoutRightSide;
