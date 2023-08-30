import { type NodeModel } from '@minoru/react-dnd-treeview';
import { type SnackbarCloseReason } from '@mui/material';
import { useState, type Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCopyToClipboard } from '../../../../hooks';
import { type TreeDataValues } from '../../types';
import { snackbarMessages } from './constants';

const useVerticalMenu = (treeData: NodeModel<TreeDataValues>[], setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>, text: string, nodeId: number) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const [isRenamePopupOpen, setIsRenamePopupOpen] = useState<boolean>(false);

	const [newFileName, setNewFileName] = useState<string>(text);
	const { copyToClipboard } = useCopyToClipboard();

	const menuId = 'basic-menu';
	const buttonId = 'basic-button';

	const closePopper = (): void => {
		setIsRenamePopupOpen(false);
		handleClose();
	};

	const deleteItem = (data: NodeModel<TreeDataValues>[]): NodeModel<TreeDataValues>[] => {
		const filteredData: NodeModel<TreeDataValues>[] = data.filter((item: NodeModel<TreeDataValues>) => item.id !== nodeId);

		return filteredData.filter((item: NodeModel<TreeDataValues>) => {
			item.droppable = treeData.some((child: NodeModel<TreeDataValues>) => child.parent === item.id);
			return true; // Keep root items or items without remaining children
		});
	};

	const duplicateNode = (nodeId: number, parentId: number | null = null): NodeModel<TreeDataValues>[] => {
		const selectedNode: NodeModel<TreeDataValues> | undefined = treeData.find((item) => item.id === nodeId); //PROJECT MANAGEMENT node

		if (!selectedNode) {
			return [];
		}

		const newSelectedNodeId: number = uuidv4();
		const newSelectedNode: NodeModel<TreeDataValues> = { ...selectedNode, id: newSelectedNodeId, parent: parentId || selectedNode.parent, text: `${selectedNode.text} (copy)` };

		let newNodes: NodeModel<TreeDataValues>[] = [newSelectedNode];
		treeData
			.filter((item: NodeModel<TreeDataValues>) => item.parent === selectedNode.id)
			.forEach((item: NodeModel<TreeDataValues>) => {
				newNodes = [...newNodes, ...duplicateNode(+item.id, newSelectedNodeId)];
			});

		return newNodes;
	};

	const handleClose = (): void => {
		setAnchorEl(null);
		setMenuIsOpen(false);
	};

	const onAddNewProjectHandler = (): void => {
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

	const onClosePopperHandler = (): void => {
		closePopper();
	};

	const onCopyItemClickedHandler = async (link: string): Promise<void> => {
		const response = await copyToClipboard(link);
		if (response) {
			setIsSnackbarOpen(true);
      setSnackbarMessage(snackbarMessages.copy)
		}
		handleClose();
	};

	const onDeleteItemClickedHandler = (): void => {
		const updatedData = deleteItem([...treeData]);
    setIsSnackbarOpen(true);
    setSnackbarMessage(snackbarMessages.delete)
		setTreeData(updatedData);
	};

	const onDuplicateItemClickedHandler = (): void => {
		const arr: NodeModel<TreeDataValues>[] = duplicateNode(nodeId);
    setIsSnackbarOpen(true);
    setSnackbarMessage(snackbarMessages.duplicate)
		setTreeData([...treeData, ...arr]);
	};

	const onMenuCloseHandler = (): void => {
		handleClose();
	};

	const onMenuItemClickedHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setAnchorEl(e.currentTarget);
		setMenuIsOpen(!menuIsOpen);
	};

	const onRenameFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsSnackbarOpen(true);
    setSnackbarMessage(snackbarMessages.rename)
		setNewFileName(e.currentTarget.value);
	};

	const onRenameItemClickedHandler = (): void => {
		setIsRenamePopupOpen(!isRenamePopupOpen);
		handleClose();
	};

	const onSnackbarCloseHandler = (_: Event | React.SyntheticEvent<unknown, Event>, reason: SnackbarCloseReason): void => {
		if (reason === 'escapeKeyDown' || reason === 'clickaway' || reason === 'timeout') {
			setIsSnackbarOpen(false);
		}
	};

	const onSaveHandler = (): void => {
		const findNode: NodeModel<TreeDataValues> | undefined = treeData.find((node: NodeModel<TreeDataValues>) => node.id === nodeId);

		if (findNode) {
			findNode.text = newFileName;
			const newTreeData: NodeModel<TreeDataValues>[] = [...treeData];
			setTreeData(newTreeData);
		}

		closePopper();
	};

	return {
		anchorEl,
		buttonId,
		isRenamePopupOpen,
		isSnackbarOpen,
		menuId,
		menuIsOpen,
		newFileName,
		onAddNewProjectHandler,
		onCopyItemClickedHandler,
		onClosePopperHandler,
		onDeleteItemClickedHandler,
		onDuplicateItemClickedHandler,
		onMenuItemClickedHandler,
		onMenuCloseHandler,
		onRenameFileChangeHandler,
		onRenameItemClickedHandler,
		onSaveHandler,
		onSnackbarCloseHandler,
    snackbarMessage
	};
};

export { useVerticalMenu };
