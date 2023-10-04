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
	};

	return initializePageEmbed;
};

export { usePageEmbed };
