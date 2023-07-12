import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import type { EditorEvent, Editor as TinyMCEEditor } from 'tinymce';

import './tinyMce.css';

const TextEditor = () => {
	const editorRef = useRef<TinyMCEEditor | null>(null);

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
							const quickToolbarNode: Element = document.getElementsByClassName('tox tox-silver-sink tox-tinymce-aux')[0];
							const iframe: HTMLIFrameElement = document.getElementsByTagName('iframe')[0];
							const tinyMceBodyNode: Element | null | undefined = iframe.contentDocument?.getElementById('tinymce');

							if (!tinyMceBodyNode || !tinyMceBodyNode.firstChild) {
								return;
							}

							const tinyMceBodyNodeAttributes = tinyMceBodyNode.firstChild;
							if (e.target === tinyMceBodyNodeAttributes) {
								quickToolbarNode.setAttribute('style', 'display: none');
							} else {
								quickToolbarNode.setAttribute('style', 'position: relative');
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
