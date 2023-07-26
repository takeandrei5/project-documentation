import { Icon, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import {FC} from 'react'

const arr = [
	{ id: 'item-1', name: 'Create a teamspace', iconName: 'people_alt_outlined_icon' },
	{ id: 'item-2', name: 'Templates', iconName: 'widgets_outlined' },
	{ id: 'item-3', name: 'Import', iconName: 'download_outlined' },
	{ id: 'item-4', name: 'Trash', iconName: 'delete_outline_outlined' }
];

const NavigationMenuHeader: FC = () => {
  const renderItems = () => {
    return arr.map((item) => {
      return (
        <ListItem key={item.id} sx={{
          '&:hover p': {
            fontWeight: 'bold'
          },
          cursor:'pointer'
        }} >
          <ListItemIcon>
            <Icon>{item.iconName}</Icon>
          </ListItemIcon>
          <Typography>{item.name}</Typography>
        </ListItem>
      );
    });
  }
	return (
		<List>
			{renderItems()}
		</List>
	);
};

export default NavigationMenuHeader;
