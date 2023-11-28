import type { Editor as TinyMCEEditor } from 'tinymce';

const usePageEmbed = () => {
	const initializePageEmbed = (editor: TinyMCEEditor): void => {
		editor.on('focus', () => {
			const iframes: NodeListOf<Element> = editor.contentDocument.querySelectorAll('div.tiny-pageembed > iframe');

			if (!iframes.length) {
				return;
			}

			iframes.forEach((iframe: Element) => {
				iframe.addEventListener('dragstart', function (e: Event) {
					e.preventDefault();
				});
			});
		});

		editor.on('OpenWindow', function (e) {
			console.log('OpenWindow', e);
			console.log('OpenWindow', e.dialog.getData());
			const data = e.dialog.getData();
			delete data.dimensions;

			console.log('data', data);
			e.dialog.setData({ ...data, size: 'tiny-pageembed--16by9' });
		});
	};

	return initializePageEmbed;
};

export { usePageEmbed };
