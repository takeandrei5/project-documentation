import { useRef } from 'react';
import type { EditorEvent, Events, Editor as TinyMCEEditor } from 'tinymce';
import { useTextEditor } from '.';

const usePlaceholder = () => {
	const currentFocusedElement = useRef<HTMLElement | null>(null);
	const isUndoTriggered = useRef<boolean>(false);
	const isRedoTriggered = useRef<boolean>(false);
	const { getTinyMceFirstLineElement, isElementDescendantOf } = useTextEditor();

	const initializePlaceholder = (editor: TinyMCEEditor): void => {
		editor.on('NodeChange', function (e: EditorEvent<Events.NodeChangeEvent>) {
			if (!e.selectionChange) {
				return;
			}

			const element: HTMLElement = e.element as HTMLElement;
			if (element === getTinyMceFirstLineElement()) {
				element.removeAttribute('placeholder');
				return;
			}

			editor.undoManager.transact(function () {
				const nodesWithPlaceholder = editor.dom.select(`[placeholder=Type]`);
				nodesWithPlaceholder.forEach((node) => {
					node.removeAttribute('placeholder');
				});

				element.setAttribute('placeholder', 'Type');
			});
		});
	};

	return initializePlaceholder;
};

export { usePlaceholder };
