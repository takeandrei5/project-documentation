import { useRef } from 'react';
import type { EditorEvent, Editor as TinyMCEEditor } from 'tinymce';
import { useTextEditor } from './useTextEditor';
import { dragElementSvg } from '../../../../../assets/svg';

const useDragAndDrop = () => {
	const { covertStringToHTMElement, getTinyMceDocumentElement, getTinyMceFirstLineElement } = useTextEditor();
	const hoveredElement = useRef<HTMLElement | null>(null);
	const hookedDragElement = useRef<HTMLElement | null>(null);
	const draggedOverElement = useRef<HTMLElement | null>(null);

	const reset = (): void => {
		const documentElement: Document = getTinyMceDocumentElement();

		draggedOverElement.current = null;
		hoveredElement.current = null;

		documentElement.getElementById('ghost-element')?.remove();
	};

	const applyDragElementStyle = (element: HTMLElement, removeStyle = false): void => {
		if (!removeStyle) {
			element.style.backgroundColor = 'rgba(35, 131, 226, 0.14)';
      element.style.backgroundClip = 'content-box';

			return;
		}

		element.style.backgroundColor = '';
    element.style.backgroundClip = '';
	};

	const isNestedElement = (element: Element): boolean => {
		if (element.parentElement && element.parentElement.nodeName !== 'BODY') {
			return true;
		}

		return false;
	};

	const hideDragElementHook = (editor: TinyMCEEditor): void => {
		editor.contentDocument.getElementById('drag-element-hook')?.remove();
	};

	const displayDragElementHook = (editor: TinyMCEEditor, element: Element): boolean => {
		if (element.nodeName === 'HTML') {
			hideDragElementHook(editor);
			return false;
		}

		if (element.nodeName === 'BODY') {
			hideDragElementHook(editor);
			return false;
		}

		if (element === getTinyMceFirstLineElement()) {
			hideDragElementHook(editor);
			return false;
		}

		if (element.id === 'drag-element-hook') {
			return false;
		}

		if (isNestedElement(element)) {
			return false;
		}

		return true;
	};

	const createDragElementHook = (sourceElement: HTMLElement, document: Document): HTMLElement => {
		const boundingClientRect: DOMRect = sourceElement.getBoundingClientRect();

		const dragElementContainer: HTMLDivElement = document.createElement('div');

		dragElementContainer.setAttribute('id', 'drag-element-hook');
		dragElementContainer.setAttribute('draggable', 'true');
		dragElementContainer.setAttribute('role', 'button');
		dragElementContainer.setAttribute('tabIndex', '-1');
		dragElementContainer.setAttribute('aria-label', 'Drag');

		dragElementContainer.style.top = `${boundingClientRect.top}px`;
		dragElementContainer.style.left = `${boundingClientRect.left + 16}px`;
		dragElementContainer.style.paddingLeft = '0';
		dragElementContainer.style.paddingRight = '0';

		return dragElementContainer;
	};

	const initializeDragAndDrop = (editor: TinyMCEEditor): void => {
    editor.on('keyup', function (e: EditorEvent<KeyboardEvent>) {
			const documentElement: Document = getTinyMceDocumentElement();

      if (e.target !== hookedDragElement.current) {
        documentElement.getElementById('drag-element-hook')?.remove();
      }
    });

		editor.on('dragend', function () {
			if (!hoveredElement.current || !draggedOverElement.current || hoveredElement.current === draggedOverElement.current) {
				return;
			} else {
        if (!draggedOverElement.current.textContent) {
          draggedOverElement.current.replaceChildren(hoveredElement.current);

        } else {
          draggedOverElement.current.appendChild(hoveredElement.current);
        }
				applyDragElementStyle(draggedOverElement.current, true);
			}

			reset();
		});

		editor.on('dragover', function (e: EditorEvent<DragEvent>) {
			e.preventDefault();

			const currentMouseOverElement: HTMLElement | null = editor.contentDocument.elementFromPoint(e.clientX, e.clientY) as HTMLElement;

			if (
				!currentMouseOverElement ||
				currentMouseOverElement.nodeName === 'HTML' ||
				currentMouseOverElement.nodeName === 'BODY' ||
				currentMouseOverElement.getAttribute('id')?.startsWith('drag-element') ||
				currentMouseOverElement === hoveredElement.current
			) {
				draggedOverElement.current = null;

				return;
			}

			if (draggedOverElement.current) {
				applyDragElementStyle(draggedOverElement.current, true);
			}
			draggedOverElement.current = currentMouseOverElement;
			applyDragElementStyle(draggedOverElement.current);
		});

		editor.on('mouseover', function (e: EditorEvent<MouseEvent>) {
			const element = e.target as HTMLElement;
			const documentElement: Document = getTinyMceDocumentElement();
			const draggableSvgIcon: HTMLElement = covertStringToHTMElement(dragElementSvg);

			if (!element || !displayDragElementHook(editor, element)) {
				return;
			}

			hoveredElement.current = element;

			const dragElementHook: HTMLElement = createDragElementHook(element, documentElement);

			dragElementHook.appendChild(draggableSvgIcon);

			dragElementHook.addEventListener('dragstart', (e: DragEvent) => {
				if (!hoveredElement.current || !e.dataTransfer) {
					return;
				}

        dragElementHook.style.opacity = '0';
				e.dataTransfer.effectAllowed = 'none';
				e.dataTransfer.setDragImage(hoveredElement.current, 50, 0);
			});

			if (element.id === 'drag-element-hook' || element.id === 'drag-element-svg' || element.id === 'drag-element-path') {
				return;
			}
			documentElement.getElementById('drag-element-hook')?.remove();

			element.insertAdjacentElement('afterend', dragElementHook);

      hookedDragElement.current = dragElementHook;
		});
	};

	return initializeDragAndDrop;
};

export { useDragAndDrop };
