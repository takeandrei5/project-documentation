import Split from 'react-split';
import { Box } from '@mui/material';
import { type NavbarLayoutProps } from './types';
import { NavigationMenuModule } from '../../modules';

const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }: NavbarLayoutProps) => {
	return (
		<Split
			className='split'
			gutterSize={8}
			sizes={[20, 80]}
			minSize={298.398}
			snapOffset={0}
			style={{
				maxHeight: '100%'
			}}>
			<NavigationMenuModule />
			<Box sx={{ backgroundColor: '#FFFFFF' }}>{children}</Box>
		</Split>
	);
};

export default NavbarLayout;
