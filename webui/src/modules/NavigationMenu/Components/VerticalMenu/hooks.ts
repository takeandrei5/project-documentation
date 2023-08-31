import type { NodeModel } from '@minoru/react-dnd-treeview';
import { type SnackbarCloseReason } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState, type Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCopyToClipboard } from '../../../../hooks';
import { useAppDispatch } from '../../../../redux/hooks';
import { setTrash } from '../../../../redux/slices/trash/trashSlice';
import type { TreeDataValues } from '../../types';

const useVerticalMenu = (
	treeData: NodeModel<TreeDataValues>[],
	setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>,
	text: string,
	nodeId: number,
) => {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	//open state
	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
	const [isRenamePopupOpen, setIsRenamePopupOpen] = useState<boolean>(false);

	//value state
	useEffect(() => {
		setNewFileName(text);
	}, [text]);
	const [newFileName, setNewFileName] = useState<string>(text);
	const { copyToClipboard } = useCopyToClipboard();

	const menuId = 'basic-menu';
	const buttonId = 'basic-button';

	const closePopper = (): void => {
		setIsRenamePopupOpen(false);
		handleClose();
	};

	const deleteItem = (data: NodeModel<TreeDataValues>[], nodeId: number): void => {
    data.forEach((item: NodeModel<TreeDataValues>) => {
      if (item.id === nodeId && item.data) {
        const desc = Object.getOwnPropertyDescriptor(item.data, 'isDeleted') || {}
        console.log(Boolean(desc.writable))
        item.data.isDeleted = true;
      }

      if (item.parent === nodeId && item.data) {
        deleteItem(data, +item.id);
      }
    });
	};

	const onSoftDeleteItemHandler = (): void => {
    const newTreeData: NodeModel<TreeDataValues>[] = _.cloneDeep(treeData);

    deleteItem(newTreeData, nodeId);
		setTreeData(newTreeData);
    console.log(newTreeData);
    dispatch(setTrash(newTreeData));
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
		}
		handleClose();
	};

	const onPermanentDeleteItemHandler = (): void => {
		setTreeData([...treeData.filter((item: NodeModel<TreeDataValues>) => item.id !== nodeId)]);
	};

	const onDuplicateItemClickedHandler = (): void => {
		const arr: NodeModel<TreeDataValues>[] = duplicateNode(nodeId);

		setTreeData([...treeData, ...arr]);
    handleClose();
	};

	const onMenuCloseHandler = (): void => {
		handleClose();
	};

	const onMenuItemClickedHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setAnchorEl(e.currentTarget);
		setMenuIsOpen(!menuIsOpen);
	};

	const onRenameFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewFileName(e.currentTarget.value);
	};

	const onRenameItemClickedHandler = (): void => {
		setIsRenamePopupOpen(!isRenamePopupOpen);
		handleClose();
	};

	const onSnackbarCloseHandler = (_: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void => {
		if (reason === 'escapeKeyDown' || reason === 'clickaway') {
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
		onDuplicateItemClickedHandler,
		onPermanentDeleteItemHandler,
		onMenuItemClickedHandler,
		onMenuCloseHandler,
		onRenameFileChangeHandler,
		onRenameItemClickedHandler,
		onSaveHandler,
		onSnackbarCloseHandler,
		onSoftDeleteItemHandler
	};
};

export { useVerticalMenu };
