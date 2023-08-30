import type { NodeModel } from '@minoru/react-dnd-treeview';
import { type SnackbarCloseReason } from '@mui/material';
import { type Dispatch, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCopyToClipboard } from '../../../../hooks';
import { DialogControlProps } from '../../../../utils/types';
import { useAppDispatch } from '../../../../redux/hooks';

const useVerticalMenu = (
	treeData:NodeModel[],
	setTreeData:Dispatch<React.SetStateAction<NodeModel[]>>,
	text:string,
	nodeId:number,
	control:DialogControlProps,
	trashTreeData:NodeModel[],
	setTrashTreeMenu:Dispatch<React.SetStateAction<NodeModel[]>>
) => {
	const dispatch = useAppDispatch();
	const { isOpen, openHandler, closeHandler } = control;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	//open state
	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
	const [isRenamePopupOpen, setIsRenamePopupOpen] = useState<boolean>(false);
	console.log({ treeData });
	//value state
	useEffect(() => {
		setNewFileName(text);
	}, [text]);
	const [newFileName, setNewFileName] = useState<string>(text);
	const { copyToClipboard } = useCopyToClipboard();

	const menuId = 'basic-menu';
	const buttonId = 'basic-button';

	const closePopper = ():void => {
		setIsRenamePopupOpen(false);
		handleClose();
	};

	const deleteItem = (data:NodeModel[]):NodeModel[] => {
		return data.filter((item:NodeModel) => {
			const bool = data.some((child:NodeModel) => child.parent === item.id);
			console.log({ bool });
			item.data.isDeletable = bool;
			item.droppable = bool;
			return true; // Keep root items or items without remaining children
		});
	};

	const onConfirmDeleteItemHandler = ():void => {
		const updatedData = deleteItem([...treeData]);
		setTreeData(updatedData);
	};

	const duplicateNode = (nodeId:number, parentId:number | null = null):NodeModel[] => {
		const selectedNode:NodeModel | undefined = treeData.find((item) => item.id === nodeId); //PROJECT MANAGEMENT node

		if (!selectedNode) {
			return [];
		}

		const newSelectedNodeId:number = uuidv4();
		const newSelectedNode:NodeModel = { ...selectedNode, id: newSelectedNodeId, parent: parentId || selectedNode.parent, text: `${selectedNode.text} (copy)` };

		let newNodes:NodeModel[] = [newSelectedNode];
		treeData
			.filter((item) => item.parent === selectedNode.id)
			.forEach((item) => {
				newNodes = [...newNodes, ...duplicateNode(item.id, newSelectedNodeId)];
			});

		return newNodes;
	};

	const handleClose = ():void => {
		setAnchorEl(null);
		setMenuIsOpen(false);
	};

	const onAddNewProjectHandler = ():void => {
		const newTreeData = {
			parent: 0,
			id: 99,
			text: 'new project',
			droppable: true,
			iconName: 'folder_open',
			link: '/project-description/2'
		};
		const newTreeDataArr = [...treeData, newTreeData];
		setTreeData(newTreeDataArr);
		handleClose();
	};

	const onClosePopperHandler = ():void => {
		closePopper();
	};

	const onCopyItemClickedHandler = async (link:string):Promise<void> => {
		const response = await copyToClipboard(link);
		if (response) {
			setIsSnackbarOpen(true);
		}
		handleClose();
	};

	const onPermanentDeleteItemHandler = ():void => {
		//		const arr:NodeModel[] = duplicateNode(nodeId);
		//		setTrashTreeMenu([...trashTreeData, ...arr]);
		//		dispatch(setTrash(arr));
		//		onConfirmDeleteItemHandler();
	};
	const onDuplicateItemClickedHandler = ():void => {
		const arr:NodeModel[] = duplicateNode(nodeId);
		setTreeData([...treeData, ...arr]);
	};

	const onMenuCloseHandler = ():void => {
		handleClose();
	};

	const onMenuItemClickedHandler = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setAnchorEl(e.currentTarget);
		setMenuIsOpen(!menuIsOpen);
	};

	const onRenameFileChangeHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
		setNewFileName(e.currentTarget.value);
	};

	const onRenameItemClickedHandler = ():void => {
		setIsRenamePopupOpen(!isRenamePopupOpen);
		handleClose();
	};

	const onSnackbarCloseHandler = (_:Event | React.SyntheticEvent<any, Event>, reason:SnackbarCloseReason):void => {
		if (reason === 'escapeKeyDown' || reason === 'clickaway') {
			setIsSnackbarOpen(false);
		}
	};

	const onSaveHandler = ():void => {
		const findNode:NodeModel | undefined = treeData.find((node:NodeModel) => node.id === nodeId);

		if (findNode) {
			findNode.text = newFileName;
			const newTreeData:NodeModel[] = [...treeData];
			setTreeData(newTreeData);
		}

		closePopper();
	};

	return {
		anchorEl,
		buttonId,
		isSnackbarOpen,
		menuId,
		menuIsOpen,
		onAddNewProjectHandler,
		onCopyItemClickedHandler,
		onClosePopperHandler,
		onConfirmDeleteItemHandler,
		onDuplicateItemClickedHandler,
		onPermanentDeleteItemHandler,
		onMenuItemClickedHandler,
		onMenuCloseHandler,
		onRenameFileChangeHandler,
		onRenameItemClickedHandler,
		onSaveHandler,
		onSnackbarCloseHandler,
		newFileName,
		isRenamePopupOpen
	};
};

export { useVerticalMenu };
