import { Box, Icon, IconButton } from '@mui/material';
import { useAddNewFileComponent } from './hooks';
import type { AddNewFileProps } from './types';
import React from 'react';
import { TextInputPopup } from '../VerticalMenu/TextInputPopup';

const AddNewFileComponent: React.FC<AddNewFileProps> = ({ setTreeData, nodeId, treeData }) => {
	const { isNewFileOpen, newFileName, onAddNewFileHandler, onChangeFileNameHandler, onClosePopperHandler, onOpenPopperHandler } = useAddNewFileComponent(
		treeData,
		setTreeData,
		nodeId
	);

	return (
		<Box sx={{ position: 'relative' }}>
			<IconButton onClick={onOpenPopperHandler} size='small' sx={{ height: '1.25rem', width: '1.25rem' }}>
				<Icon sx={{ fontSize: '1.25rem' }}>add</Icon>
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
