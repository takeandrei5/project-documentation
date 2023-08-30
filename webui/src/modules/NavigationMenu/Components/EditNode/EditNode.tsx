import React from 'react';
import { EditNodeProps } from './types';
import { Box, Popover, Typography } from '@mui/material';
import NodeTextInput from '../NodeTextInput/NodeTextInput';
import useEditNode from './hooks';

const EditNode:React.FC<EditNodeProps> = ({ treeData, setTreeData, node }) => {
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
				aria-describedby={id}
				style={{
					display: 'flex',
					alignItems: 'center'
				}}
				onDoubleClick={handleClick}
			>
				<Typography>{node.text}</Typography>
			</Box>
		</>
	);
};
export default EditNode;
