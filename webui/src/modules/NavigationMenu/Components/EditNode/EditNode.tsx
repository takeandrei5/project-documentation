import { Box, Icon, ListItemIcon, Popover, Snackbar, Typography } from '@mui/material';
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
	const editNodeRef = useRef(null);

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
		<>
			<Box
				ref={editNodeRef}
				tabIndex={0}
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					cursor: 'pointer',
					'&:focus': {
						outline: 'none'
					}
				}}>
				{node.droppable && (
					<ListItemIcon onClick={onToggle} sx={{ minWidth: '0.5rem', cursor: 'pointer' }}>
						{isOpen ? <Icon>expand_more</Icon> : <Icon>chevron_right</Icon>}
					</ListItemIcon>
				)}
				<ListItemIcon sx={{ minWidth: 0, mr: '0.25rem' }}>
					<Icon>{node.data!.iconName}</Icon>
				</ListItemIcon>
				<Popover id='popover' open={open} anchorEl={anchorEl} onClose={onCloseHandler}>
					<NodeTextInput
						onChangeHandler={(ev) => setValue(ev.target.value)}
						onSaveHandler={onSaveHandler}
						value={value}
						onBlurHandler={onCloseHandler}
					/>
				</Popover>
				<Box
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
					onDoubleClick={onDoubleClickHandler}>
					<Typography>{node.text}</Typography>
				</Box>
				<Box sx={{ zIndex: 1001 }}>
					{isRenamePopupOpen && (
						<RenameFilePopup
							value={newFileName}
							onClosePopperHandler={onClosePopperHandler}
							onChangeHandler={onRenameFileChangeHandler}
							onSaveHandler={onSaveShortCommandHandler}
						/>
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
		</>
	);
};
export default EditNode;
