import { type Dispatch, type SetStateAction, useState } from 'react';
import type { NodeModel } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const useNavigationMenuHeader = (setTreeData: Dispatch<SetStateAction<NodeModel[]>>, treeData: NodeModel[]) => {
	const [projectName, setProjectName] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const changeModalState = (state: boolean): void => {
		setIsModalOpen(state);
	};

	const addNewProjectHandler = (): void => {
		const newTreeData: NodeModel = {
			parent: 0,
			id: uuidv4(),
			text: projectName,
			droppable: true,
			iconName: 'folder_open',
			link: '/project-description/2'
		};
		setTreeData([...treeData, newTreeData]);
		changeModalState(false);
		setProjectName('');
	};

	const onClickHandler = (): void => {
		changeModalState(true);
	};

	const onCloseHandler = (): void => {
		changeModalState(false);
	};

	const onCreateProjectButtonClickedHandler = (): void => {
		addNewProjectHandler();
	};

	const onProjectNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setProjectName(e.target.value);
	};

	const onProjectNameKeyPressedHandler = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === 'Enter') {
			addNewProjectHandler();
		}
	};

	return { isModalOpen, onClickHandler, onCloseHandler, onCreateProjectButtonClickedHandler, onProjectNameChangeHandler, onProjectNameKeyPressedHandler, projectName };
};

export { useNavigationMenuHeader };
