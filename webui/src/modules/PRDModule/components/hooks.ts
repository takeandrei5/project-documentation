/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Editor as TinyMCEEditor } from 'tinymce';

const useTextEditor = () => {
	const getQuickToolbarElement = (): Element => {
		const quickToolbarNode: Element = document.getElementsByClassName('tox tox-silver-sink tox-tinymce-aux')[0];

		return quickToolbarNode;
	};

	const getTinyMceBodyElement = (): Element => {
		const iframe: HTMLIFrameElement = document.getElementsByTagName('iframe')[0];
		const tinyMceBodyNode: Element = iframe.contentDocument!.getElementById('tinymce')!;

		return tinyMceBodyNode;
	};

	const getTinyMceFirstLineNode = (): ChildNode => {
		const bodyElement: Element = getTinyMceBodyElement();
		const firstLineNode: ChildNode = bodyElement.firstChild!;

		return firstLineNode;
	};

  const getTinyMceFirstLineElement = (): Element => {
		const bodyElement: Element = getTinyMceBodyElement();
		const firstLineElement: Element = bodyElement.firstElementChild!;

		return firstLineElement;
	};

	const isCharacterInsertedInFirstLineElement = (editor: TinyMCEEditor): boolean => {
		const firstChildNode: ChildNode = getTinyMceFirstLineNode();
		const isInsertedInFirstNode = editor.selection.getNode().isSameNode(firstChildNode);

		return isInsertedInFirstNode;
	};

	return { getQuickToolbarElement, getTinyMceBodyElement, getTinyMceFirstLineNode, getTinyMceFirstLineElement, isCharacterInsertedInFirstLineElement };
};

export { useTextEditor };
