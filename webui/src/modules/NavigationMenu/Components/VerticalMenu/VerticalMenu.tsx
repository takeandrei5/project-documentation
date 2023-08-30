import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Icon, ListItemButton, Snackbar, Typography } from '@mui/material';
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
import Dialog from './Dialog/Dialog';
import useDialogControl from '../../../../hooks/useDialogControl';

const VerticalMenu:React.FC<VerticalMenuProps> = ({ nodeId, setTreeData, text, treeData, setTrashTreeData, trashTreeData }) => {
	const control = useDialogControl();
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
					onConfirmDeleteItemHandler,
					onPermanentDeleteItemHandler,
					onDuplicateItemClickedHandler,
					onMenuItemClickedHandler,
					onMenuCloseHandler,
					onRenameFileChangeHandler,
					onRenameItemClickedHandler,
					onSaveHandler,
					onSnackbarCloseHandler
				} = useVerticalMenu(treeData, setTreeData, text, nodeId, control, trashTreeData, setTrashTreeData);

	const dialogContent:JSX.Element = <Box>
		<Typography variant={'body1'}>If you press <strong>'Confirm'</strong> button the, file will be moved to trash and be permanently deleted in 30 days.</Typography><br />
		<Typography variant={'body1'}>If you press <strong>'Permanently delete'</strong> button, you will not be able to recover the file.</Typography>
	</Box>;

	return (
		<>
			<Box sx={{ position: 'relative' }}>
				<ListItemButton
					id={buttonId}
					aria-controls={menuIsOpen ? menuId : undefined}
					aria-haspopup='true'
					aria-expanded={menuIsOpen ? 'true' : undefined}
					onClick={onMenuItemClickedHandler}
					sx={{ p: '0.4rem' }}
				>
					<MoreHorizIcon />
				</ListItemButton>
				<Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
					{isRenamePopupOpen &&
						<RenameFilePopup value={newFileName} onClosePopperHandler={onClosePopperHandler} onChangeHandler={onRenameFileChangeHandler} onSaveHandler={onSaveHandler} />}
				</Box>
				<Menu
					anchorEl={anchorEl}
					id={menuId}
					open={menuIsOpen}
					onClose={onMenuCloseHandler}
					MenuListProps={{
						'aria-labelledby': buttonId
					}}
					sx={{ '& .MuiPaper-root': { width: 300 } }}
				>
					<CopyItem onClickHandler={onCopyItemClickedHandler} />
					<DuplicateItem onClickHandler={onDuplicateItemClickedHandler} />
					<RenameItem onClickHandler={onRenameItemClickedHandler} />
					<DeleteItem onClickHandler={() => {
						control.openHandler();
						onMenuCloseHandler();
					}}
					/>
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
			<Dialog title={'Delete page'}
							content={dialogContent}
							onConfirm={onConfirmDeleteItemHandler}
							onPermanentlyDelete={onPermanentDeleteItemHandler}
							control={control}
							confirmLabel={'Confirm'}
							deleteLabel={'Permanently delete'}
			/>
		</>

	);
};
export default VerticalMenu;
