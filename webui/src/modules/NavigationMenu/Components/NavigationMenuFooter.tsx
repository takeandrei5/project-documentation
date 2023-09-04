import { Box, Icon, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const arr = [
	{ id: 'item-1', name: 'Create a teamspace', iconName: 'people_alt_outlined_icon', link: '#' },
	{ id: 'item-2', name: 'Templates', iconName: 'widgets_outlined', link: '#' },
	{ id: 'item-3', name: 'Import', iconName: 'download_outlined', link: '#' },
	{ id: 'item-4', name: 'Trash', iconName: 'delete_outline_outlined', link: '/trash' }
];

const NavigationMenuFooter: React.FC = () => {
	const params = useParams();
	const currentPath = `/project-documentation/${params.id}`;
	const renderItems = (): JSX.Element[] => {
		return arr.map((item) => {
			const link: string = `${currentPath}${item.link}`;

			return (
				<Box key={item.id} component={'span'} sx={{ '& a': { textDecoration: 'none', color: 'inherit' } }}>
					<Link to={link}>
						<ListItem
							sx={{
								'&:hover p': {
									fontWeight: 'bold'
								},
								cursor: 'pointer'
							}}>
							<ListItemIcon>
								<Icon>{item.iconName}</Icon>
							</ListItemIcon>
							<Typography>{item.name}</Typography>
						</ListItem>
					</Link>
				</Box>
			);
		});
	};
	return <List>{renderItems()}</List>;
};

export default NavigationMenuFooter;
