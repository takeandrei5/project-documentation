import type { Editor as TinyMCEEditor } from 'tinymce';
import { componentSvg } from '../../../../../assets/svg';

const useComponent = () => {
	const initializeComponent = (editor: TinyMCEEditor): void => {
		editor.ui.registry.addIcon('component', componentSvg);

		editor.ui.registry.addButton('component', {
			icon: 'component',
			tooltip: 'Insert component',
			onAction: function () {
				editor.windowManager.open({
					title: 'Create component', // The dialog's title - displayed in the dialog header
					body: {
						type: 'panel', // The root body type - a Panel or TabPanel
						items: [
							// A list of panel components
							{
                type: 'input',
                name: 'componentName',
                inputMode: 'text',
                label: 'Component name',
                placeholder: 'User registration story...',
                enabled: true,
                maximized: true
              },
              {
                type: 'selectbox', // component type
                name: 'SelectA', // identifier
                label: 'Select Label',
                enabled: false, // enabled state
                size: 1, // number of visible values (optional)
                items: [
                  { value: 'one', text: 'One' },
                  { value: 'two', text: 'Two' }
                ]
              }
						]
					},
					buttons: [
						{
							type: 'submit',
							text: 'OK'
						}
					],
					size: 'normal'
				});
				// editor.insertContent(`
				//   <div class="component">
				//       <div class="content"><p>${editor.selection.getContent()}</p></div>
				//   </div>
				// `)
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
