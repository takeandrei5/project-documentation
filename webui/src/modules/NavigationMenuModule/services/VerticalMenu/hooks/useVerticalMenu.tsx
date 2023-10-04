import type { NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Typography, type SnackbarCloseReason } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate, useParams, type NavigateFunction } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { createPageApi, deletePageApi, updatePageApi } from '../../../../../api/webapi/pages';
import type { CreatePageRequest, UpdatePageRequest } from '../../../../../api/webapi/pages/types';
import type { DialogControl } from '../../../../../components/DialogC/types';
import { useCopyToClipboard } from '../../../../../hooks';
import type { TreeDataValues } from '../../../types';
import type { SnackbarMessages } from '../types';

const useVerticalMenu = (treeData: NodeModel<TreeDataValues>[], setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void, onRenameItemClickedCallback: () => void, nodeId: string) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const { copyToClipboard } = useCopyToClipboard();
	const params = useParams<{ organizationId: string; projectId: string }>();
	const navigate: NavigateFunction = useNavigate();
  const { mutate: createPageMutate } = useMutation((data: CreatePageRequest) => createPageApi(data, params.projectId!, params.organizationId!));
	const { mutate: updatePageMutate } = useMutation((data: UpdatePageRequest) => updatePageApi(data, nodeId, params.projectId!, params.organizationId!));
	const { mutate: deletePageMutate } = useMutation(() => deletePageApi(nodeId, params.projectId!, params.organizationId!));

	const snackbarMessages: SnackbarMessages = {
		copy: 'Link copied to clipboard'
	};

	const closePopper = (): void => {
		handleClose();
	};

	const deleteItem = (data: NodeModel<TreeDataValues>[], nodeId: string): void => {
		data.forEach((item: NodeModel<TreeDataValues>) => {
			if (item.id === nodeId && item.data) {
				item.data.isDeleted = true;
				updatePageMutate({
					iconName: item.data.iconName,
					isSoftDeleted: true,
					name: item.text,
					parentId: item.parent === '0' ? undefined : (item.parent as string),
					content: item.data.content
				});
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
		deletePageMutate();
		setTreeData([...treeData.filter((item: NodeModel<TreeDataValues>) => item.id !== nodeId)]);
		navigate(`/organizations/${params.organizationId!}/projects/${params.projectId!}/project-documentation`);
	};

	const onDuplicateItemClickedHandler = (): void => {
		const arr: NodeModel<TreeDataValues>[] = duplicateNode(nodeId);

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

	const onRenameItemClickedHandler = (): void => {
		handleClose();
		onRenameItemClickedCallback();
	};

	const onSnackbarCloseHandler = (_: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void => {
		if (reason === 'escapeKeyDown' || reason === 'clickaway') {
			setIsSnackbarOpen(false);
		}
	};

	const onDeleteItemClickedHandler = (control: DialogControl): void => {
		control.openHandler();
		handleClose();
	};

	const onSaveHandler = (newPageName: string): void => {
		const findNode: NodeModel<TreeDataValues> | undefined = treeData.find((node: NodeModel<TreeDataValues>) => node.id === nodeId);

		if (findNode) {
			findNode.text = newPageName;
			const newTreeData: NodeModel<TreeDataValues>[] = [...treeData];
			setTreeData(newTreeData);
		}

		closePopper();
	};

	const deleteDialogContent: JSX.Element = (
		<Box>
			<Typography sx={(theme) => ({ color: theme.palette.textColor[100] })}>
				If you press <strong>'Confirm'</strong> button the, file will be moved to trash and be permanently deleted in 30 days.
			</Typography>
			<br />
			<Typography sx={(theme) => ({ color: theme.palette.textColor[100] })}>
				If you press <strong>'Permanently delete'</strong> button, you will not be able to recover the file.
			</Typography>
		</Box>
	);

	return {
		anchorEl,
		deleteDialogContent,
		isRenamePopupOpen,
		isSnackbarOpen,
		menuIsOpen,
		onAddNewProjectHandler,
		onCopyItemClickedHandler,
		onClosePopperHandler,
		onDeleteItemClickedHandler,
		onDuplicateItemClickedHandler,
		onPermanentDeleteItemHandler,
		onMenuItemClickedHandler,
		onMenuCloseHandler,
		onRenameItemClickedHandler,
		onSaveHandler,
		onSnackbarCloseHandler,
		onSoftDeleteItemHandler,
		snackbarMessage
	};
};

export { useVerticalMenu };
