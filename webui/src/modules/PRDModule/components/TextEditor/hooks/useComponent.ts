import type { Editor as TinyMCEEditor } from 'tinymce';
import { componentSvg } from '../../../../../assets/svg';

const useComponent = () => {
	const initializeComponent = (editor: TinyMCEEditor): void => {
		editor.ui.registry.addIcon('component', componentSvg);

		editor.ui.registry.addButton('component', {
			icon: 'component',
			tooltip: 'Insert component',
			onAction: function () {
				editor.insertContent(`
          <div class="wrapper-component">
            <h3>Add title component</h3>
            <div class="component">
              <div class="content"><p>${editor.selection.getContent()}</p></div>
            </div>
          </div>
        `);
			}
		});

		editor.ui.registry.addButton('removecomponent', {
			icon: 'remove',
			tooltip: 'Remove component',
			onAction: function () {
				const node: HTMLElement = editor.selection.getNode();
				const callout: Element | null = editor.dom.getParent(node, '.component');
				if (!callout) {
					return;
				}
				callout.remove();
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
