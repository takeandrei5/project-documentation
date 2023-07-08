import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import type { Editor as TinyMCEEditor } from 'tinymce';

const NavbarLayoutRightSide: React.FC = () => {
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
				initialValue='<p>This is the initial content of the editor.</p>'
				init={{
					menubar: false,
					inline: true,
					plugins: ['autolink', 'autoresize', 'codesample', 'checklist', 'link', 'lists', 'media', 'powerpaste', 'table', 'image', 'quickbars', 'codesample'],
					toolbar: false,
					content_style: 'body { font-family:ui-sans-serif, -apple-system, "system-ui", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"; font-size:14pt }',
					quickbars_insert_toolbar: 'quicktable image media codesample',
					quickbars_selection_toolbar: 'bold italic underline strikethrough blocks' + '| indent outdent' + '| alignleft aligncenter alignjustify alignright' + '| backcolor forecolor' + '| bullist checklist numlist' + '| link',
					powerpaste_word_import: 'clean',
					powerpaste_html_import: 'clean',
					icons: 'material'
				}}
			/>
			<button onClick={log}>Log editor content</button>
		</>
	);
};

export default NavbarLayoutRightSide;
