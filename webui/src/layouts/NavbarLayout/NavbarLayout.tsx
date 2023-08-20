import Split from 'react-split';
import { Box } from '@mui/material';
import { type NavbarLayoutProps } from './types';
import { NavigationMenu } from '../../modules/NavigationMenu';

const NavbarLayout:React.FC<NavbarLayoutProps> = ({ children }:NavbarLayoutProps) => {
	return (
		<Split className='split' gutterSize={8} sizes={[20, 80]} snapOffset={0}>
			<Box sx={{ minWidth: '40%' }}><NavigationMenu /></Box>
			<Box sx={{ minWidth: '20%', backgroundColor: '#FFFFFF' }}>{children}</Box>
		</Split>
	);
};

export default NavbarLayout;
