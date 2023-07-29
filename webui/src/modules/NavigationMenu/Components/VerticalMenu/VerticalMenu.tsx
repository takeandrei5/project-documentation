import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Icon, ListItemButton, Snackbar } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CopyItem, DeleteItem, DuplicateItem } from './MenuItems';
import { RenameItem } from './MenuItems/RenameItem';
import { RenameFilePopup } from './RenameFilePopup';
import { useVerticalMenu } from './hooks';
import { type VerticalMenuProps } from './types';

const VerticalMenu: React.FC<VerticalMenuProps> = ({ nodeId, setTreeData, text, treeData }) => {
	const {
		anchorEl,
		buttonId,
    isRenamePopupOpen,
		isSnackbarOpen,
		menuId,
		menuIsOpen,
		newFileName,
		onAddNewProjectHandler,
		onClosePopperHandler,
		onCopyItemClickedHandler,
		onDeleteItemClickedHandler,
		onDuplicateItemClickedHandler,
		onMenuItemClickedHandler,
		onMenuCloseHandler,
		onRenameFileChangeHandler,
		onRenameItemClickedHandler,
		onSaveHandler,
		onSnackbarCloseHandler
	} = useVerticalMenu(treeData, setTreeData, text, nodeId);

	return (
		<Box sx={{ position: 'relative' }}>
			<ListItemButton
				id={buttonId}
				aria-controls={menuIsOpen ? menuId : undefined}
				aria-haspopup='true'
				aria-expanded={menuIsOpen ? 'true' : undefined}
				onClick={onMenuItemClickedHandler}
				sx={{ p: '0.4rem' }}>
				<MoreHorizIcon />
			</ListItemButton>
			<Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
				{isRenamePopupOpen && <RenameFilePopup value={newFileName} onClosePopperHandler={onClosePopperHandler} onChangeHandler={onRenameFileChangeHandler} onSaveHandler={onSaveHandler} />}
			</Box>
			<Menu
				anchorEl={anchorEl}
				id={menuId}
				open={menuIsOpen}
				onClose={onMenuCloseHandler}
				MenuListProps={{
					'aria-labelledby': buttonId
				}}
				sx={{ '& .MuiPaper-root': { width: 300 } }}>
				<CopyItem onClickHandler={onCopyItemClickedHandler} />
				<DuplicateItem onClickHandler={onDuplicateItemClickedHandler} />
				<RenameItem onClickHandler={onRenameItemClickedHandler} />
				<DeleteItem onClickHandler={onDeleteItemClickedHandler} />
				<Divider />
				<MenuItem onClick={onAddNewProjectHandler}>
					<ListItemIcon>
						<Icon>cloud</Icon>
					</ListItemIcon>
					<ListItemText>Web Clipboard</ListItemText>
				</MenuItem>
			</Menu>
			<Snackbar
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={isSnackbarOpen}
				onClose={onSnackbarCloseHandler}
				message='Link copied to clipboard!'
				key='bottom-center'
			/>
		</Box>
	);
};
export default VerticalMenu;
