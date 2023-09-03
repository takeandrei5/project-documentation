import React, { Dispatch, useState, RefObject } from 'react';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { useHotkeys } from 'react-hotkeys-hook';

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

const useShortCommands = (treeData:NodeModel[],
													setTreeData:Dispatch<React.SetStateAction<NodeModel[]>>,
													node:NodeModel,
													nodeRef:RefObject<HTMLInputElement>,
													openDeleteDialogHandler:() => void,
													onCopyItemClickedHandler:(link:string) => Promise<void>,
													onRenameItemClickedHandler:() => void,
													onDuplicateItemClickedHandler:() => void) => {

	useHotkeys(['ctrl+c', 'meta+c'], async () => {
		if (nodeRef.current === document.activeElement) {
			await onCopyItemClickedHandler(node.data.link);
		}
	}, [treeData, setTreeData, node]);

	useHotkeys(['ctrl+r', 'meta+r'], (ev) => {
		if (nodeRef.current === document.activeElement) {
			ev.preventDefault();
			ev.stopPropagation();
			onRenameItemClickedHandler();
		}
	}, [treeData, setTreeData, node]);

	useHotkeys(['ctrl+d', 'meta+d'], () => {
		if (nodeRef.current === document.activeElement) {
			onDuplicateItemClickedHandler();
		}
	}, [treeData, setTreeData, node]);

	useHotkeys(['ctrl+v', 'meta+v'], () => {
		if (nodeRef.current === document.activeElement) {
			openDeleteDialogHandler();
		}
	}, [treeData, setTreeData, node]);
};
export { useEditNode, useShortCommands };

