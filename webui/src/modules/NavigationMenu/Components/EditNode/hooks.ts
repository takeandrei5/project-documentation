import React, { Dispatch, useState } from 'react';
import { NodeModel } from '@minoru/react-dnd-treeview';

const useEditNode = (treeData:NodeModel[], setTreeData:Dispatch<React.SetStateAction<NodeModel[]>>, node:NodeModel) => {
	const [value, setValue] = useState<string>(node.text);
	const nodeId = node.id;
	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event:React.MouseEvent<HTMLButtonElement>):void => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	const handleClose = ():void => {
		setAnchorEl(null);
		setOpen(false);
	};

	const id = open ? 'popover' : undefined;

	const onSaveHandler = ():void => {
		const findNode:NodeModel | undefined = treeData.find((node:NodeModel) => node.id === nodeId);
		if (findNode) {
			findNode.text = value;
			const newTreeData:NodeModel[] = [...treeData];
			setTreeData(newTreeData);
		}
		setOpen(false);
	};

	return {
		value,
		setValue,
		nodeId,
		open,
		anchorEl,
		handleClick,
		handleClose,
		id,
		onSaveHandler
	};
};
export default useEditNode;