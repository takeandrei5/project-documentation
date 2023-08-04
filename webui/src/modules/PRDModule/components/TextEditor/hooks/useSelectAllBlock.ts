import { useRef } from 'react';
import type { EditorEvent, Editor as TinyMCEEditor } from 'tinymce';
import { useTextEditor } from './useTextEditor';

const useSelectAllBlock = () => {
	const currentFocusedElement = useRef<HTMLElement | null>(null);

  const { isCharacterInsertedInFirstLineElement } = useTextEditor();

  const initializeSelectAllBlock = (editor: TinyMCEEditor) => {
    editor.on('keydown', function (e: EditorEvent<KeyboardEvent>) {
      if (e.key === 'Enter' && e.shiftKey && isCharacterInsertedInFirstLineElement(editor)) {
        e.preventDefault();
      }

      if (currentFocusedElement.current && e.key === 'a') {
        editor.selection.select(currentFocusedElement.current, true);
      } else {
        currentFocusedElement.current = null;
      }

      if (e.ctrlKey || e.metaKey) {
        currentFocusedElement.current = editor.selection.getNode();
      }
    });
  };

  return initializeSelectAllBlock;
}

export { useSelectAllBlock }