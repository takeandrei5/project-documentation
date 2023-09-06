import { Box, Icon, IconButton } from '@mui/material';
import { useAddNewFileComponent } from './hooks';
import type { AddNewFileProps } from './types';
import React from 'react';
import ReactDOM from 'react-dom';
import { TextInputPopup } from '../VerticalMenu/TextInputPopup';

const AddNewFileComponent: React.FC<AddNewFileProps> = ({ setTreeData, nodeId, treeData }) => {
	const { isNewFileOpen, newFileName, onAddNewFileHandler, onChangeFileNameHandler, onClosePopperHandler, onOpenPopperHandler } = useAddNewFileComponent(
		treeData,
		setTreeData,
		nodeId
	);

	// const TextInputPopupPortal = ReactDOM.createPortal(
	//   <TextInputPopup value={newFileName} onChangeHandler={onChangeFileNameHandler} onClosePopperHandler={onClosePopperHandler} onSaveHandler={onAddNewFileHandler} />
	// , document.getElementById('text-input-popup')!);

	return (
		<Box sx={{ position: 'relative' }}>
			<IconButton disableRipple={false} disableFocusRipple={false} disableTouchRipple={false} onClick={onOpenPopperHandler} size='small'>
				<Icon>add</Icon>
			</IconButton>
			<Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
				{isNewFileOpen && (
					<TextInputPopup value={newFileName} onChangeHandler={onChangeFileNameHandler} onClosePopperHandler={onClosePopperHandler} onSaveHandler={onAddNewFileHandler} />
				)}
			</Box>
		</Box>
	);
};
export default AddNewFileComponent;
