import type { EditorEvent, Events, Editor as TinyMCEEditor } from 'tinymce';
import { useTextEditor } from './useTextEditor';

const useQuickToolbar = () => {
	const { getQuickToolbarElement, getTinyMceFirstLineNode, getTinyMceFirstLineElement } = useTextEditor();

	const initializeQuickToolbar = (editor: TinyMCEEditor): void => {
		editor.on('dblclick', function (e: EditorEvent<MouseEvent>) {
			const quickToolbarElement: Element = getQuickToolbarElement();
			const firstChildNode: ChildNode = getTinyMceFirstLineNode();

			if (e.target === firstChildNode) {
				quickToolbarElement.setAttribute('style', 'display: none');
			} else {
				quickToolbarElement.setAttribute('style', 'position: relative');
			}
		});

		editor.on('NodeChange', function (e: EditorEvent<Events.NodeChangeEvent>) {
			const quickToolbarElement: HTMLElement = getQuickToolbarElement();
			const firstChildElement: HTMLElement = getTinyMceFirstLineElement();
			const element: HTMLElement = e.element as HTMLElement;

			if (element === firstChildElement || !element.innerHTML) {
				quickToolbarElement.setAttribute('style', 'display: none');
			} else {
				quickToolbarElement.setAttribute('style', 'position: relative');
			}
		});
	};

	return initializeQuickToolbar;
};

export { useQuickToolbar };
