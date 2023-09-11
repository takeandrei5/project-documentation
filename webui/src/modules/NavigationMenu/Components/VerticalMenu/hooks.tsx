import type { NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Typography, type SnackbarCloseReason } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState, type Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCopyToClipboard } from '../../../../hooks';
import { useAppDispatch } from '../../../../redux/hooks';
import { setTrash } from '../../../../redux/slices/trash/trashSlice';
import { DialogControlProps } from '../../../../utils/types';
import type { TreeDataValues } from '../../types';
import { snackbarMessages } from './constants';

const useVerticalMenu = (treeData: NodeModel<TreeDataValues>[], setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>, text: string, nodeId: string) => {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
	const [isRenamePopupOpen, setIsRenamePopupOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const [newFileName, setNewFileName] = useState<string>(text);
	const { copyToClipboard } = useCopyToClipboard();

	const menuId = 'basic-menu';
	const buttonId = 'basic-button';

	useEffect(() => {
		setNewFileName(text);
	}, [text]);

	const closePopper = (): void => {
		setIsRenamePopupOpen(false);
		handleClose();
	};

	const deleteItem = (data: NodeModel<TreeDataValues>[], nodeId: string): void => {
		data.forEach((item: NodeModel<TreeDataValues>) => {
			if (item.id === nodeId && item.data) {
				item.data.isDeleted = true;
			}

			if (item.parent === nodeId && item.data) {
				deleteItem(data, item.id.toString());
			}
		});
	};

	const onSoftDeleteItemHandler = (): void => {
		const newTreeData: NodeModel<TreeDataValues>[] = _.cloneDeep(treeData);

		deleteItem(newTreeData, nodeId);
		setTreeData(newTreeData);
		dispatch(setTrash(newTreeData));
	};

	const duplicateNode = (nodeId: string, parentId: string | null = null): NodeModel<TreeDataValues>[] => {
		const selectedNode: NodeModel<TreeDataValues> | undefined = treeData.find((item) => item.id === nodeId); //PROJECT MANAGEMENT node

		if (!selectedNode) {
			return [];
		}

		const newSelectedNodeId: string = uuidv4();
		const newSelectedNode: NodeModel<TreeDataValues> = { ...selectedNode, id: newSelectedNodeId, parent: parentId || selectedNode.parent, text: `${selectedNode.text} (copy)` };

		let newNodes: NodeModel<TreeDataValues>[] = [newSelectedNode];
		treeData
			.filter((item: NodeModel<TreeDataValues>) => item.parent === selectedNode.id)
			.forEach((item: NodeModel<TreeDataValues>) => {
				newNodes = [...newNodes, ...duplicateNode(item.id.toString(), newSelectedNodeId.toString())];
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
			setSnackbarMessage(snackbarMessages.copy);
			setIsSnackbarOpen(true);
		}
		handleClose();
	};

	const onPermanentDeleteItemHandler = (): void => {
		setTreeData([...treeData.filter((item: NodeModel<TreeDataValues>) => item.id !== nodeId)]);
	};

	const onDuplicateItemClickedHandler = (): void => {
		const arr: NodeModel<TreeDataValues>[] = duplicateNode(nodeId);

		setSnackbarMessage(snackbarMessages.duplicate);
		setTreeData([...treeData, ...arr]);
		handleClose();
	};

	const onMenuCloseHandler = (): void => {
		handleClose();
	};

	const onMenuItemClickedHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(e.currentTarget);
		setMenuIsOpen(!menuIsOpen);
	};

	const onRenameFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewFileName(e.currentTarget.value);
	};

	const onRenameItemClickedHandler = (): void => {
		setIsRenamePopupOpen(!isRenamePopupOpen);
		handleClose();
		setSnackbarMessage(snackbarMessages.rename);
	};

	const onSnackbarCloseHandler = (_: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void => {
		if (reason === 'escapeKeyDown' || reason === 'clickaway') {
			setIsSnackbarOpen(false);
		}
	};

	const onDeleteItemClickedHandler = (control: DialogControlProps): void => {
		control.openHandler();
		handleClose();
    setSnackbarMessage(snackbarMessages.delete);
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

	const deleteDialogContent: JSX.Element = (
		<Box>
			<Typography variant={'body1'}>
				If you press <strong>'Confirm'</strong> button the, file will be moved to trash and be permanently deleted in 30 days.
			</Typography>
			<br />
			<Typography variant={'body1'}>
				If you press <strong>'Permanently delete'</strong> button, you will not be able to recover the file.
			</Typography>
		</Box>
	);

	return {
		anchorEl,
		buttonId,
		deleteDialogContent,
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
		onPermanentDeleteItemHandler,
		onMenuItemClickedHandler,
		onMenuCloseHandler,
		onRenameFileChangeHandler,
		onRenameItemClickedHandler,
		onSaveHandler,
		onSnackbarCloseHandler,
		onSoftDeleteItemHandler,
		snackbarMessage
	};
};

export { useVerticalMenu };
