import type { EditorEvent, Editor as TinyMCEEditor } from 'tinymce';

const useAccordion = () => {
	const initializeAccordion = (editor: TinyMCEEditor): void => {
		editor.on('click', function (e: EditorEvent<MouseEvent>) {
			if (e.target.nodeName === 'SUMMARY') {
				editor.execCommand('ToggleAccordion', false);
			}
		});
	};

	return initializeAccordion;
};

export { useAccordion };
