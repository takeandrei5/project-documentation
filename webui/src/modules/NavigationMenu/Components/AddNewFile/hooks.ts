import { type Dispatch, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { NodeModel } from '../../types';

const useAddNewFileComponent = (treeData: NodeModel[], setTreeData: Dispatch<React.SetStateAction<NodeModel[]>>, nodeId: number) => {
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
		const newTreeData: NodeModel = {
			parent: nodeId,
			id: uuidv4(),
			text: newFileName,
			iconName: 'text_snippet_outlined',
			link: `/project-description/2/${newFileName}`
		};

		const newTreeDataArr = [...treeData, newTreeData];

		setTreeData(newTreeDataArr);
		setIsNewFileOpen(false);
	};

	return { isNewFileOpen, onOpenPopperHandler, onClosePopperHandler, onAddNewFileHandler, onChangeFileNameHandler, newFileName };
};

export { useAddNewFileComponent };