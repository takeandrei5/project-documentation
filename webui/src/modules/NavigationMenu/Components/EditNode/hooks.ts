import type { NodeModel } from '@minoru/react-dnd-treeview';
import { type Dispatch, type RefObject, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import type { TreeDataValues } from '../../types';

const useEditNode = (treeData: NodeModel<TreeDataValues>[], setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>, node: NodeModel) => {
	const [value, setValue] = useState<string>(node.text);
	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

	const onDoubleClickHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	const onCloseHandler = (): void => {
		setAnchorEl(null);
		setOpen(false);
	};

	const onSaveHandler = (): void => {
		const findNode: NodeModel<TreeDataValues> | undefined = treeData.find((node: NodeModel<TreeDataValues>) => node.id === node.id);

		if (findNode) {
			findNode.text = value;
			setTreeData([...treeData]);
		}

		setOpen(false);
	};

	return {
		anchorEl,
		onCloseHandler,
		onDoubleClickHandler,
		onSaveHandler,
		open,
		setValue,
		value
	};
};

const useShortCommands = (
	treeData: NodeModel<TreeDataValues>[],
	setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>,
	node: NodeModel<TreeDataValues>,
	nodeRef: RefObject<HTMLElement>,
	openDeleteDialogHandler: () => void,
	onCopyItemClickedHandler: (link: string) => Promise<void>,
	onRenameItemClickedHandler: () => void,
	onDuplicateItemClickedHandler: () => void
) => {
	useHotkeys(
		['ctrl+c', 'meta+c'],
		async () => {
			if (nodeRef.current === document.activeElement && node.data) {
				await onCopyItemClickedHandler(node.data.link);
			}
		},
		[treeData, setTreeData, node]
	);

	useHotkeys(
		['ctrl+r', 'meta+r'],
		(e: KeyboardEvent) => {
			if (nodeRef.current === document.activeElement) {
				e.preventDefault();
				e.stopPropagation();

				onRenameItemClickedHandler();
			}
		},
		[treeData, setTreeData, node]
	);

	useHotkeys(
		['ctrl+d', 'meta+d'],
		() => {
			if (nodeRef.current === document.activeElement) {
				onDuplicateItemClickedHandler();
			}
		},
		[treeData, setTreeData, node]
	);

	useHotkeys(
		['ctrl+v', 'meta+v'],
		() => {
			if (nodeRef.current === document.activeElement) {
				openDeleteDialogHandler();
			}
		},
		[treeData, setTreeData, node]
	);
};
export { useEditNode, useShortCommands };
