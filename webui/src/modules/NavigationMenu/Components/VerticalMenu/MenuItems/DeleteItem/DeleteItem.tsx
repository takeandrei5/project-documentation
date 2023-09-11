import { Divider, Icon, ListItemIcon, ListItemText, MenuItem, Theme, Typography } from '@mui/material';
import { type DeleteItemProps } from './types';

const DeleteItem:React.FC<DeleteItemProps> = ({ control, onClickHandler }) => {
	return (
		<>
			<Divider sx={{ mt: '0.25rem !important', mb: '0.25rem !important' }} />
			<MenuItem onClick={() => onClickHandler(control)}>
				<ListItemIcon>
					<Icon sx={(theme:Theme) => ({ color: theme.palette.red[100] })}>delete_outline</Icon>
				</ListItemIcon>
				<ListItemText><Typography variant='smallRegular' sx={(theme:Theme) => ({ color: theme.palette.red[100] })}>Delete</Typography></ListItemText>
				<Typography variant='smallRegular' sx={(theme:Theme) => ({ color: theme.palette.textColor[20] })}>
					⌘+⌫
				</Typography>
			</MenuItem>
		</>
	);
};

export default DeleteItem;
