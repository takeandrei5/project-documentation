import { Box } from '@mui/material';

import { type MainLayoutProps } from './types';

const MainLayout:React.FC<MainLayoutProps> = ({ children }:MainLayoutProps) => {
	return <Box sx={{ height: '100%', width: '100%', backgroundColor: '#FBFBFA' }}>{children}</Box>;
};

export default MainLayout;
