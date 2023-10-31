import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Divider, IconButton, Snackbar, useTheme, type Theme } from '@mui/material';
import Menu from '@mui/material/Menu';
import DialogC from '../../../../components/DialogC/DialogC';
import { VerticalMenuItem } from '../../views';
import { useVerticalMenu } from './hooks/useVerticalMenu';
import { type VerticalMenuProps } from './types';
import {useDialogControl} from '../../../../hooks'

const VerticalMenu: React.FC<VerticalMenuProps> = ({ nodeId, setTreeData, text, treeData, link, onRenameItemClickedCallback }) => {
	const control = useDialogControl();
	const theme: Theme = useTheme();

	const {
		anchorEl,
		deleteDialogContent,
		isSnackbarOpen,
		menuIsOpen,
		onCopyItemClickedHandler,
		onDeleteItemClickedHandler,
		onPermanentDeleteItemHandler,
		onDuplicateItemClickedHandler,
		onMenuItemClickedHandler,
		onMenuCloseHandler,
		onSnackbarCloseHandler,
		onSoftDeleteItemHandler,
		snackbarMessage
	} = useVerticalMenu(treeData, setTreeData, text, nodeId, onRenameItemClickedCallback);

	return (
		<>
			<Box sx={{ position: 'relative' }}>
				<IconButton
					id='more-button'
					aria-controls={menuIsOpen ? 'more-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={menuIsOpen ? 'true' : undefined}
					onClick={onMenuItemClickedHandler}
					sx={{ height: '1.25rem', width: '1.25rem', padding: '0.4rem' }}>
					<MoreHorizIcon sx={{ fontSize: '1.25rem' }} />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					id='more-menu'
					open={menuIsOpen}
					onClose={onMenuCloseHandler}
					MenuListProps={{
						'aria-labelledby': 'more-button'
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
					{/* <VerticalMenuItem iconName='content_paste' shortcut='⌘+D' onClickHandler={onDuplicateItemClickedHandler} text='Duplicate' /> */}
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
			<DialogC
				title='Delete file'
				content={deleteDialogContent}
				onOutlinedButtonClickedHandler={onSoftDeleteItemHandler}
				onContainedButtonClickedHandler={onPermanentDeleteItemHandler}
				control={control}
				outlinedButtonLabel='Confirm'
				containedButtonLabel='Permanently delete'
			/>
		</>
	);
};
export default VerticalMenu;
