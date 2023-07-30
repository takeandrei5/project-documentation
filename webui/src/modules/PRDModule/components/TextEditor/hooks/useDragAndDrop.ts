import { useRef } from 'react';
import type { EditorEvent, Editor as TinyMCEEditor } from 'tinymce';
import { useTextEditor } from './useTextEditor';
import { parse } from 'node-html-parser';

const useDragAndDrop = () => {
	const { covertStringToHTMElement, getTinyMceDocumentElement, getTinyMceFirstLineElement } = useTextEditor();
	const currentMouseOveredElement = useRef<Element | null>(null);

	const dragElementSvg = `
    <svg id="drag-element-svg" viewBox="0 0 10 10" class="dragHandle"
        style="width: 14px; height: 14px; z-index: -1; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden;">
        <path
          id="drag-element-path"
          d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z">
          </path>
          </svg>
          `;

	const initializeDragAndDrop = (editor: TinyMCEEditor): void => {
		editor.on('mouseover', function (e: EditorEvent<MouseEvent>) {
			const element = e.target as Element;
			const documentElement: Document = getTinyMceDocumentElement();
      const draggableSvgIcon: HTMLElement = covertStringToHTMElement(dragElementSvg);

			if (element.nodeName === 'HTML' || element.nodeName === 'BODY' || element === getTinyMceFirstLineElement()) {
				return;
			}

			if (element.nodeName === 'P') {
				currentMouseOveredElement.current = element;
			}

			const boundingClientRect: DOMRect = currentMouseOveredElement.current!.getBoundingClientRect();

			const dragElement = documentElement.createElement('div');

			dragElement.setAttribute('id', 'drag-element-container');
			dragElement.setAttribute('draggable', 'true');
			dragElement.setAttribute('role', 'button');
			dragElement.setAttribute('tabIndex', '-1');
			dragElement.setAttribute('aria-label', 'Drag');

			dragElement.style.top = `${boundingClientRect.top}px`;
			dragElement.style.left = `${boundingClientRect.left - 27}px`;

			dragElement.appendChild(draggableSvgIcon);
			dragElement.addEventListener('dragstart', (e: DragEvent) => {
				if (!currentMouseOveredElement.current) {
					return;
				}

				e.dataTransfer?.setDragImage(currentMouseOveredElement.current, 10, 10);
				e.dataTransfer?.setData('text/html', currentMouseOveredElement.current.innerHTML);
			});

			dragElement.addEventListener('dragend', (e: DragEvent) => {
				if (e.dataTransfer?.dropEffect === 'copy' && currentMouseOveredElement.current) {
					currentMouseOveredElement.current.remove();
					editor.selection.collapse();
					editor.undoManager.data.pop();
				}
			});

			if (element.id === 'drag-element-container' || element.id === 'drag-element-svg' || element.id === 'drag-element-path') {
				return;
			}
			documentElement.getElementById('drag-element-container')?.remove();

			element.insertAdjacentElement('afterend', dragElement);
		});
	};

  return initializeDragAndDrop;
};

export { useDragAndDrop };
