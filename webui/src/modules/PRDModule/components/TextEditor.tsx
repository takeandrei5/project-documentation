import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { useTextEditor } from './hooks';
import type { EditorEvent, Editor as TinyMCEEditor } from 'tinymce';

import './tinyMce.css';

const TextEditor = () => {
	const editorRef = useRef<TinyMCEEditor | null>(null);

	const { getQuickToolbarElement, getTinyMceBodyElement, getTinyMceFirstLineNode, isCharacterInsertedInFirstLineElement } = useTextEditor();

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
					quickbars_selection_toolbar: 'bold italic underline strikethrough blocks' + '| indent outdent' + '| alignleft aligncenter alignjustify alignright' + '| backcolor forecolor' + '| bullist checklist numlist' + '| link',
					content_style: `body p:first-child {
            font-family: ui-sans-serif, -apple-system, "system-ui",
              "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif,
              "Segoe UI Emoji", "Segoe UI Symbol";
            font-size: 40px;
            font-weight: 700;
            line-height: 1.2;
            color: #37352F
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
						});
					}
				}}
			/>
			<button onClick={log}>Log editor content</button>
		</>
	);
};

export default TextEditor;
