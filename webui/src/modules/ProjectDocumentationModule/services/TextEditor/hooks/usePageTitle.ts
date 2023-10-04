import type { EditorEvent, Events, Editor as TinyMCEEditor } from 'tinymce';
import { useTextEditor } from '.';

const usePageTitle = () => {
	const { getQuickToolbarElement, getTinyMceFirstLineElement } = useTextEditor();

	const initializePageTitle = (editor: TinyMCEEditor): void => {
		editor.on('NodeChange', function (e: EditorEvent<Events.NodeChangeEvent>) {
			const quickToolbarElement: Element = getQuickToolbarElement();
			const firstChildElement: Element = getTinyMceFirstLineElement();
			const element: HTMLElement = e.element as HTMLElement;

			if (element === firstChildElement || !element.innerHTML) {
				quickToolbarElement.setAttribute('style', 'display: none');
			} else {
				quickToolbarElement.setAttribute('style', 'position: relative');
			}
		});
	};
	return initializePageTitle;
};

export { usePageTitle };
