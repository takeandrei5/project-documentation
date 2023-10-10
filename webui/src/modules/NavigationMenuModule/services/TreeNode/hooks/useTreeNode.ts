import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useState } from 'react';
import type { TreeDataValues } from '../../../types';

const useTreeNode = (treeData: NodeModel<TreeDataValues>[], setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void, node: NodeModel) => {
	const [value, setValue] = useState<string>(node.text);
	const [popupOpen, setPopupOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

	const onDoubleClickHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
		setAnchorEl(event.currentTarget);
		setPopupOpen(true);
	};

	const onCloseHandler = (): void => {
		setAnchorEl(null);
		setPopupOpen(false);
	};

	const onSaveHandler = (): void => {
		const findNode: NodeModel<TreeDataValues> | undefined = treeData.find((node: NodeModel<TreeDataValues>) => node.id === node.id);

		if (findNode) {
			findNode.text = value;
			setTreeData([...treeData]);
		}

		setPopupOpen(false);
	};

	return {
		anchorEl,
		onCloseHandler,
		onDoubleClickHandler,
		onSaveHandler,
		popupOpen,
		setValue,
		value
	};
};

export { useTreeNode };
