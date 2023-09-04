import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { useTextEditor } from './hooks';
import type { EditorEvent, Events, Editor as TinyMCEEditor } from 'tinymce';

import './tinyMce.css';

const TextEditor = () => {
	const editorRef = useRef<TinyMCEEditor | null>(null);
	const currentFocusedElement = useRef<Element | null>(null);

	const { getQuickToolbarElement, getTinyMceFirstLineNode, getTinyMceFirstLineElement, isCharacterInsertedInFirstLineElement } = useTextEditor();

	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};

	return (
		<>
			<Editor
				apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
				onInit={(_, editor: TinyMCEEditor) => (editorRef.current = editor)}
				initialValue='This is the initial content of the editor.'
				plugins={['quickbars', 'autoresize']}
				init={{
					menubar: false,
					toolbar: false,
					statusbar: false,
          placeholder: 'Untitled',
					quickbars_selection_toolbar: 'bold italic underline strikethrough blocks' + '| indent outdent' + '| alignleft aligncenter alignjustify alignright' + '| backcolor forecolor' + '| bullist checklist numlist' + '| link',
					content_style: `
          & {
            font-family: ui-sans-serif, -apple-system, 'system-ui', 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
          }

          body > p:first-child {
            font-size: 2.5rem;
            line-height: 1.2;
            font-weight: 700;
            color: #37352F;
          }

          body[aria-placeholder="Untitled"] {
            font-size: 2.5rem;
            line-height: 1.2;
            opacity: 0.3;
          }

          p {
            margin: 0;
          }`,
					icons: 'material',
					setup: function (editor: TinyMCEEditor) {
						editor.on('dblclick', function (e: EditorEvent<MouseEvent>) {
							const quickToolbarElement: Element = getQuickToolbarElement();
							const firstChildNode: ChildNode = getTinyMceFirstLineNode();

							if (e.target === firstChildNode) {
								quickToolbarElement.setAttribute('style', 'display: none');
							} else {
								quickToolbarElement.setAttribute('style', 'position: relative');
							}
						});

						editor.on('keydown', function (e: EditorEvent<KeyboardEvent>) {
							if (e.key === 'Enter' && e.shiftKey && isCharacterInsertedInFirstLineElement(editor)) {
								e.preventDefault();
							}

							if (currentFocusedElement.current && e.key === 'a') {
								editor.selection.select(currentFocusedElement.current);
							} else {
								currentFocusedElement.current = null;
							}

							if (e.ctrlKey || e.metaKey) {
								currentFocusedElement.current = editor.selection.getNode();
							}
						});

						editor.on('NodeChange', function (e: EditorEvent<Events.NodeChangeEvent>) {
							const quickToolbarElement: Element = getQuickToolbarElement();
							const firstChildElement: Element = getTinyMceFirstLineElement();

							if (e.element === firstChildElement || !e.element.innerHTML) {
								quickToolbarElement.setAttribute('style', 'display: none');
							} else {
								quickToolbarElement.setAttribute('style', 'position: relative');
							}
						});
					}
				}}
			/>
			<button onClick={log}>Log editor content</button>
		</>
	);
};

export default TextEditor;
