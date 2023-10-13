import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useState } from 'react';
import type { MUIIconKeys } from '../../../../../utils/types';
import type { TreeDataValues } from '../../../types';

const useTreeNode = (treeData: NodeModel<TreeDataValues>[], setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void, node: NodeModel) => {
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

	const onSaveNewValuesHandler = (pageName: string, pageIconName: MUIIconKeys): void => {
		const findNode: NodeModel<TreeDataValues> | undefined = treeData.find((treeNode: NodeModel<TreeDataValues>) => treeNode.id === node.id);

		if (findNode) {
			findNode.text = pageName;
			findNode.data!.iconName = pageIconName;
			setTreeData([...treeData]);
		}

		setPopupOpen(false);
	};

	return {
		anchorEl,
		onCloseHandler,
		onDoubleClickHandler,
		onSaveNewValuesHandler,
		popupOpen
	};
};

export { useTreeNode };
