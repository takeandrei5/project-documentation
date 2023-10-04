import { Box, List } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { NavigationMenuItem } from '../../views/NavigationMenuItem';
import type { NavigationMenuFooterProps } from './types';

const NavigationMenuFooter: React.FC<NavigationMenuFooterProps> = ({ isLoading }) => {
	const params = useParams<{ projectId: string; organizationId: string }>();
	const navigate = useNavigate();

	return (
		<List sx={{ padding: 0 }}>
			<Box component='span' sx={{ '& a': { textDecoration: 'none', color: 'inherit' } }}>
				<NavigationMenuItem isLoading={isLoading} icon='people_alt_outlined_icon' onClick={console.log} text='Create a teamspace' />
			</Box>
			<Box component='span' sx={{ '& a': { textDecoration: 'none', color: 'inherit' } }}>
				<NavigationMenuItem isLoading={isLoading} icon='widgets_outlined' onClick={console.log} text='Templates' />
			</Box>
			<Box component='span' sx={{ '& a': { textDecoration: 'none', color: 'inherit' } }}>
				<NavigationMenuItem isLoading={isLoading} icon='download_outlined' onClick={console.log} text='Import' />
			</Box>
			<Box component='span' sx={{ '& a': { textDecoration: 'none', color: 'inherit' } }}>
				<NavigationMenuItem
					isLoading={isLoading}
					icon='delete_outline_outlined'
					onClick={() => navigate(`/organizations/${params.organizationId!}/projects/${params.projectId!}/project-documentation/trash`)}
					text='Trash'
				/>
			</Box>
		</List>
	);
};

export default NavigationMenuFooter;
