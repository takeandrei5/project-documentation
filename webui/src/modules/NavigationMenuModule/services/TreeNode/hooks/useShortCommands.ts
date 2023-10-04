import type { NodeModel } from '@minoru/react-dnd-treeview';
import { type RefObject } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useParams } from 'react-router-dom';
import type { TreeDataValues } from '../../../types';

const useShortCommands = (
	treeData: NodeModel<TreeDataValues>[],
	setTreeData: (treeData: NodeModel<TreeDataValues>[]) => void,
	node: NodeModel<TreeDataValues>,
	nodeRef: RefObject<HTMLElement>,
	openDeleteDialogHandler: () => void,
	onCopyItemClickedHandler: (link: string) => Promise<void>,
	onRenameItemClickedHandler: () => void,
	onDuplicateItemClickedHandler: () => void
) => {
	const params = useParams<{ projectId: string; organizationId: string }>();

	useHotkeys(
		['ctrl+c', 'meta+c'],
		async () => {
			if (nodeRef.current === document.activeElement) {
				await onCopyItemClickedHandler(`/organizations/${params.organizationId!}/projects/${params.projectId!}/project-documentation/pages/${node.id}`);
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
		(e: KeyboardEvent) => {
			if (nodeRef.current === document.activeElement) {
				e.preventDefault();
				e.stopPropagation();

				onDuplicateItemClickedHandler();
			}
		},
		[treeData, setTreeData, node]
	);

	useHotkeys(
		['ctrl+backspace', 'meta+backspace'],
		(e: KeyboardEvent) => {
			if (nodeRef.current === document.activeElement) {
				e.stopPropagation();

				openDeleteDialogHandler();
			}
		},
		[treeData, setTreeData, node]
	);
};

export { useShortCommands };
