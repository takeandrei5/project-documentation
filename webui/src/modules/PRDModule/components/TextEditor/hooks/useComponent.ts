import type { Editor as TinyMCEEditor } from 'tinymce';
import { componentSvg } from '../../../../../assets/svg';

const useComponent = () => {
	const initializeComponent = (editor: TinyMCEEditor): void => {
		editor.ui.registry.addIcon('component', componentSvg);

		editor.ui.registry.addButton('removecomponent', {
			icon: 'remove',
			tooltip: 'Remove component',
			onAction: function () {
				const node: HTMLElement = editor.selection.getNode();
				const callout: Element | null = editor.dom.getParent(node, '.component');
				const calloutWrapper: Element | null = editor.dom.getParent(callout, '.component-wrapper');

        console.log(node);
        if (!callout || !calloutWrapper) {
					return;
				}
				callout.remove();
        calloutWrapper.remove();

        editor.execCommand('delete');
			}
		});

		editor.ui.registry.addContextToolbar('component', {
			predicate: function (node: Element) {
				return node.classList.contains('component');
			},
			items: 'removecomponent',
			position: 'node',
			scope: 'node'
		});
	};

	return initializeComponent;
};

export { useComponent };
