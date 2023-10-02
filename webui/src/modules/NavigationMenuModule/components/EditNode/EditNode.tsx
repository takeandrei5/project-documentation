import { Box, Icon, IconButton, Popover, Snackbar, Tooltip, Typography, type Theme } from '@mui/material';
import React, { useRef } from 'react';
import useDialogControl from '../../../../hooks/useDialogControl';
import NodeTextInput from '../NodeTextInput/NodeTextInput';
import Dialog from '../VerticalMenu/Dialog/Dialog';
import { RenameFilePopup } from '../VerticalMenu/RenameFilePopup';
import { useVerticalMenu } from '../VerticalMenu/hooks';
import { useEditNode, useShortCommands } from './hooks';
import type { EditNodeProps } from './types';

const EditNode: React.FC<EditNodeProps> = ({ treeData, setTreeData, node, onToggle, isOpen }) => {
	const control = useDialogControl();
	const editNodeRef = useRef<HTMLElement | null>(null);

	const {
		deleteDialogContent,
		isRenamePopupOpen,
		isSnackbarOpen,
		newFileName,
		onClosePopperHandler,
		onCopyItemClickedHandler,
		onPermanentDeleteItemHandler,
		onDuplicateItemClickedHandler,
		onRenameFileChangeHandler,
		onRenameItemClickedHandler,
		onSaveHandler: onSaveShortCommandHandler,
		onSnackbarCloseHandler,
		onSoftDeleteItemHandler
	} = useVerticalMenu(treeData, setTreeData, node.text, node.id.toString());

	useShortCommands(treeData, setTreeData, node, editNodeRef, control.openHandler, onCopyItemClickedHandler, onRenameItemClickedHandler, onDuplicateItemClickedHandler);

	const { anchorEl, onCloseHandler, onDoubleClickHandler, onSaveHandler, open, value, setValue } = useEditNode(treeData, setTreeData, node);
	return (
		<Box
			ref={editNodeRef}
			tabIndex={0}
			sx={{
				display: 'flex',
				alignItems: 'center',
				width: 'calc(100% - 3rem)',
				gap: '0.25rem',
				'&:focus': {
					outline: 'none'
				}
			}}>
			{node.droppable && (
				<IconButton onClick={onToggle} size='small' sx={{ height: '1.25rem', width: '1.25rem' }}>
					{isOpen ? (
						<Icon sx={(theme: Theme) => ({ color: theme.palette.purple[100], fontSize: '1.25rem' })}>expand_more</Icon>
					) : (
						<Icon
							sx={(theme: Theme) => ({
								color: theme.palette.cyan[40],
								fontSize: '1.25rem',
								'&:hover': {
									color: theme.palette.purple[100]
								}
							})}>
							chevron_right
						</Icon>
					)}
				</IconButton>
			)}
			{node.data && <Icon sx={{ fontSize: '1.25rem' }}>{node.data.iconName}</Icon>}
			<Popover id='popover' open={open} anchorEl={anchorEl} onClose={onCloseHandler}>
				<NodeTextInput onChangeHandler={(ev) => setValue(ev.target.value)} onSaveHandler={onSaveHandler} value={value} onBlurHandler={onCloseHandler} />
			</Popover>
			<Tooltip enterDelay={1200} enterNextDelay={1200} enterTouchDelay={1200} placement='top' title={node.text} onDoubleClick={onDoubleClickHandler}>
				<Typography
					noWrap
					variant='smallMedium'
					sx={(theme: Theme) => ({ color: theme.palette.textColor[60], overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'calc(100% - 1.5rem)' })}>
					{node.text}
				</Typography>
			</Tooltip>
			<Box sx={{ zIndex: 1001 }}>
				{isRenamePopupOpen && (
					<RenameFilePopup value={newFileName} onClosePopperHandler={onClosePopperHandler} onChangeHandler={onRenameFileChangeHandler} onSaveHandler={onSaveShortCommandHandler} />
				)}
			</Box>
			<Snackbar
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={isSnackbarOpen}
				onClose={onSnackbarCloseHandler}
				message='Link copied to clipboard!'
				key='bottom-center'
			/>
			<Dialog
				title={'Delete page'}
				content={deleteDialogContent}
				onOutlinedButtonClickedHandler={onSoftDeleteItemHandler}
				onContainedButtonClickedHandler={onPermanentDeleteItemHandler}
				control={control}
				outlinedButtonLabel={'Confirm'}
				containedButtonLabel={'Permanently delete'}
			/>
		</Box>
	);
};
export default EditNode;
