import React, { useRef } from 'react';
import { EditNodeProps } from './types';
import { Box, Icon, ListItemIcon, Popover, Snackbar, Typography } from '@mui/material';
import NodeTextInput from '../NodeTextInput/NodeTextInput';
import { useEditNode, useShortCommands } from './hooks';
import { useVerticalMenu } from '../VerticalMenu/hooks';
import useDialogControl from '../../../../hooks/useDialogControl';
import { RenameFilePopup } from '../VerticalMenu/RenameFilePopup';
import Dialog from '../VerticalMenu/Dialog/Dialog';

const EditNode:React.FC<EditNodeProps> = ({ treeData, setTreeData, node, trashTreeData, setTrashTreeData, onToggle, isOpen }) => {
	const control = useDialogControl();
	const editNodeRef = useRef(null);

	const {
					isRenamePopupOpen,
					isSnackbarOpen,
					newFileName,
					onClosePopperHandler,
					onCopyItemClickedHandler,
					onConfirmDeleteItemHandler,
					onPermanentDeleteItemHandler,
					onDuplicateItemClickedHandler,
					onRenameFileChangeHandler,
					onRenameItemClickedHandler,
					onSnackbarCloseHandler,
					onSaveHandler: onSaveShortCommandHandler,
					deleteDialogContent
				} = useVerticalMenu(treeData, setTreeData, node.text, node.id, control, trashTreeData, setTrashTreeData);

	useShortCommands(treeData, setTreeData, node, editNodeRef, control.openHandler, onCopyItemClickedHandler, onRenameItemClickedHandler, onDuplicateItemClickedHandler);

	const {
					open,
					onSaveHandler,
					handleClose,
					anchorEl,
					handleClick,
					value,
					setValue,
					id
				} = useEditNode(treeData, setTreeData, node);
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
				}}
			>
				{node.droppable &&
					<ListItemIcon onClick={onToggle} sx={{ minWidth: '0.5rem', cursor: 'pointer' }}>{isOpen ? <Icon>expand_more</Icon> :
						<Icon>chevron_right</Icon>}</ListItemIcon>}
				<ListItemIcon sx={{ minWidth: 0, mr: '0.25rem' }}>
					<Icon>{node.data!.iconName}</Icon>
				</ListItemIcon>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
				>
					<NodeTextInput onChangeHandler={(ev) => setValue(ev.target.value)}
												 onClosePopperHandler={handleClose}
												 onSaveHandler={onSaveHandler}
												 value={value}
												 onBlurHandler={handleClose}
					/>
				</Popover>
				<Box
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
					onDoubleClick={handleClick}
				>
					<Typography>{node.text}</Typography>
				</Box>
				<Box sx={{ zIndex: 1001 }}>
					{isRenamePopupOpen &&
						<RenameFilePopup value={newFileName}
														 onClosePopperHandler={onClosePopperHandler}
														 onChangeHandler={onRenameFileChangeHandler}
														 onSaveHandler={onSaveShortCommandHandler}
						/>}
				</Box>
				<Snackbar
					autoHideDuration={3000}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					open={isSnackbarOpen}
					onClose={onSnackbarCloseHandler}
					message='Link copied to clipboard!'
					key='bottom-center'
				/>
				<Dialog title={'Delete page'}
								content={deleteDialogContent}
								onConfirm={onConfirmDeleteItemHandler}
								onPermanentlyDelete={onPermanentDeleteItemHandler}
								control={control}
								confirmLabel={'Confirm'}
								deleteLabel={'Permanently delete'}
				/>
			</Box>
		</>
	);
};
export default EditNode;
