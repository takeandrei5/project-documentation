/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Editor as TinyMCEEditor } from 'tinymce';

const useTextEditor = () => {
  const covertStringToHTMElement = (htmlString: string): HTMLElement => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlString, 'text/html');

    return htmlDoc.body.firstChild as HTMLElement;
  }

	const getQuickToolbarElement = (): HTMLElement => {
		const quickToolbarNode: HTMLElement = document.getElementsByClassName('tox tox-silver-sink tox-tinymce-aux')[0] as HTMLElement;

		return quickToolbarNode;
	};

	const getTinyMceDocumentElement = (): Document => {
		const iframe: HTMLIFrameElement = document.getElementsByTagName('iframe')[0];
		return iframe.contentDocument!;
	};

	const getTinyMceBodyElement = (): HTMLElement => {
		const iframe: HTMLIFrameElement = document.getElementsByTagName('iframe')[0];
		const tinyMceBodyNode: HTMLElement = iframe.contentDocument!.getElementById('tinymce')!;

		return tinyMceBodyNode;
	};

	const getTinyMceFirstLineNode = (): ChildNode => {
		const bodyElement: HTMLElement = getTinyMceBodyElement();
		const firstLineNode: ChildNode = bodyElement.firstChild!;

		return firstLineNode;
	};

	const getTinyMceFirstLineElement = (): HTMLElement => {
		const bodyElement: HTMLElement = getTinyMceBodyElement();
		const firstLineElement: HTMLElement = bodyElement.firstElementChild! as HTMLElement;

		return firstLineElement;
	};

	const isCharacterInsertedInFirstLineElement = (editor: TinyMCEEditor): boolean => {
		const firstChildNode: ChildNode = getTinyMceFirstLineNode();
		const isInsertedInFirstNode = editor.selection.getNode().isSameNode(firstChildNode);

		return isInsertedInFirstNode;
	};

  const isElementDescendantOf = (element: HTMLElement, ancestor: string): boolean => {
    let node: HTMLElement | null = element;

    while (node !== null) {
      if (node.nodeName === ancestor) {
        return true;
      }

      node = node.parentElement;
    }

    return false;
  }

	return { covertStringToHTMElement, getQuickToolbarElement, getTinyMceBodyElement, getTinyMceDocumentElement, getTinyMceFirstLineNode, getTinyMceFirstLineElement, isCharacterInsertedInFirstLineElement, isElementDescendantOf };
};

export { useTextEditor };
