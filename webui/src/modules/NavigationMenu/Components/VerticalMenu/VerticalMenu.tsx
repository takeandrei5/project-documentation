import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Divider, IconButton, Snackbar, useTheme, type Theme } from '@mui/material';
import Menu from '@mui/material/Menu';
import useDialogControl from '../../../../hooks/useDialogControl';
import Dialog from './Dialog/Dialog';
import { RenameFilePopup } from './RenameFilePopup';
import { VerticalMenuItem } from './VerticalMenuItem';
import { useVerticalMenu } from './hooks';
import { type VerticalMenuProps } from './types';

const VerticalMenu: React.FC<VerticalMenuProps> = ({ nodeId, setTreeData, text, treeData, link }) => {
	const control = useDialogControl();
  const theme: Theme = useTheme();

	const {
		anchorEl,
		buttonId,
		deleteDialogContent,
		isRenamePopupOpen,
		isSnackbarOpen,
		menuId,
		menuIsOpen,
		newFileName,
		onClosePopperHandler,
		onCopyItemClickedHandler,
		onDeleteItemClickedHandler,
		onPermanentDeleteItemHandler,
		onDuplicateItemClickedHandler,
		onMenuItemClickedHandler,
		onMenuCloseHandler,
		onRenameFileChangeHandler,
		onRenameItemClickedHandler,
		onSaveHandler,
		onSnackbarCloseHandler,
		onSoftDeleteItemHandler,
		snackbarMessage
	} = useVerticalMenu(treeData, setTreeData, text, nodeId);

	return (
		<>
			<Box sx={{ position: 'relative' }}>
				<IconButton
					id={buttonId}
					aria-controls={menuIsOpen ? menuId : undefined}
					aria-haspopup='true'
					aria-expanded={menuIsOpen ? 'true' : undefined}
					onClick={onMenuItemClickedHandler}
					sx={{ height: '1.25rem', width: '1.25rem', padding: '0.4rem' }}>
					<MoreHorizIcon sx={{ fontSize: '1.25rem' }} />
				</IconButton>
				<Box sx={{ position: 'absolute', top: '-3rem', left: '-2.5rem', zIndex: 1000 }}>
					{isRenamePopupOpen && (
						<RenameFilePopup value={newFileName} onClosePopperHandler={onClosePopperHandler} onChangeHandler={onRenameFileChangeHandler} onSaveHandler={onSaveHandler} />
					)}
				</Box>
				<Menu
					anchorEl={anchorEl}
					id={menuId}
					open={menuIsOpen}
					onClose={onMenuCloseHandler}
					MenuListProps={{
						'aria-labelledby': buttonId
					}}
					sx={(theme: Theme) => ({
						'& .MuiPaper-root': { width: 200, borderRadius: '0.5rem' },
						'& .MuiList-root': { padding: '0.5rem' },
						'& .MuiList-root li': { padding: '0.25rem 0.5rem', '&:hover': { borderRadius: '0.25rem', backgroundColor: theme.palette.background.default } },
						'& .MuiListItemIcon-root ': {
							minWidth: '0 !important',
							marginRight: '0.3rem',
							'& span': {
								fontSize: '1rem'
							}
						}
					})}>
					<VerticalMenuItem iconName='content_copy' shortcut='⌘+C' onClickHandler={() => onCopyItemClickedHandler(link)} text='Copy' />
					<VerticalMenuItem iconName='content_paste' shortcut='⌘+D' onClickHandler={onDuplicateItemClickedHandler} text='Duplicate' />
					<VerticalMenuItem iconName='drive_file_rename_outline' shortcut='⌘+R' onClickHandler={onRenameItemClickedHandler} text='Rename' />
					<Divider sx={{ mt: '0.25rem !important', mb: '0.25rem !important' }} />
					<VerticalMenuItem color={theme.palette.red[100]} iconName='delete_outline' shortcut='⌘+⌫' onClickHandler={() => onDeleteItemClickedHandler(control)} text='Delete' />
				</Menu>
				<Snackbar
					autoHideDuration={3000}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					open={isSnackbarOpen}
					onClose={onSnackbarCloseHandler}
					message={snackbarMessage}
					key='bottom-center'
					sx={{
						'div.MuiSnackbarContent-message': {
							fontSize: '1rem'
						}
					}}
				/>
			</Box>
			<Dialog
				title={'Delete file'}
				content={deleteDialogContent}
				onOutlinedButtonClickedHandler={onSoftDeleteItemHandler}
				onContainedButtonClickedHandler={onPermanentDeleteItemHandler}
				control={control}
				outlinedButtonLabel={'Confirm'}
				containedButtonLabel={'Permanently delete'}
			/>
		</>
	);
};
export default VerticalMenu;
