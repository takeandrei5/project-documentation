import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const NavbarLayoutRightSide: React.FC = () => {
	const editorRef = useRef<unknown | null>(null);
	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};

	return (
		<>
			<Editor
				apiKey='jfsdtu13jdktgd8qdvokv0g1t3fso4xidcwrlykuli4pavg7'
				onInit={(_, editor) => {
					console.log(editor);
					editorRef.current = editor;
				}}
				initialValue='<p>This is the initial content of the editor.</p>'
				init={{
					height: 500,
					menubar: false,
					inline: true,
					plugins: ['autolink', 'autoresize', 'codesample', 'link', 'lists', 'media', 'powerpaste', 'table', 'image', 'quickbars', 'codesample', 'help'],
					toolbar: false,
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
					quickbars_insert_toolbar: 'quicktable image media codesample',
					quickbars_selection_toolbar: 'bold italic underline | blocks | bullist numlist | blockquote quicklink',
					contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
					powerpaste_word_import: 'clean',
					powerpaste_html_import: 'clean'
				}}
			/>
			<button onClick={log}>Log editor content</button>
		</>
	);
};

export default NavbarLayoutRightSide;
