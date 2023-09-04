import type { NodeModel } from '@minoru/react-dnd-treeview';
import { useState, type Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { TreeDataValues } from '../../types';

const useAddNewFileComponent = (treeData: NodeModel<TreeDataValues>[], setTreeData: Dispatch<React.SetStateAction<NodeModel<TreeDataValues>[]>>, nodeId: number) => {
	const [newFileName, setNewFileName] = useState<string>('');
	const [isNewFileOpen, setIsNewFileOpen] = useState<boolean>(false);

	const onChangeFileNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewFileName(e.target.value);
	};

	const onOpenPopperHandler = (): void => {
		setIsNewFileOpen(!isNewFileOpen);
	};

	const onClosePopperHandler = (): void => {
		setIsNewFileOpen(false);
	};

	const onAddNewFileHandler = (): void => {
		const newTreeData: NodeModel<TreeDataValues> = {
			parent: nodeId,
			id: uuidv4(),
			text: newFileName,
			data: { iconName: 'text_snippet_outlined', link: `/project-description/2/${newFileName}`, isDeleted: false }
		};

		const newTreeDataArr = [...treeData, newTreeData];

		setTreeData(newTreeDataArr);
		setIsNewFileOpen(false);
	};

	return { isNewFileOpen, onOpenPopperHandler, onClosePopperHandler, onAddNewFileHandler, onChangeFileNameHandler, newFileName };
};

export { useAddNewFileComponent };
