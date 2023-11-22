import type { Editor as TinyMCEEditor } from 'tinymce';
import { componentSvg } from '../../../../../assets/svg';
import type { MessageEventEditComponentModal, MessageEventOpenEditComponentModal } from '../../CreateUpdateComponentFormDialog/types';
import { deleteJiraIssueApi } from '../../../../../api/jiraapi';

const useComponent = () => {
	const initializeComponent = (editor: TinyMCEEditor): void => {
		editor.ui.registry.addIcon('component', componentSvg);

		editor.ui.registry.addButton('removecomponent', {
			icon: 'remove',
			tooltip: 'Remove component',
			onAction: async function () {
				const node: HTMLElement = editor.selection.getNode();
				const component: Element | null = editor.dom.getParent(node, '.component');

				if (!component) {
					return;
				}

				const jiraIssueId = component.getAttribute('data-jiraissueid') || '';

				if (jiraIssueId) {
					await deleteJiraIssueApi(jiraIssueId);
				}

				component.remove();
				editor.execCommand('delete');
			}
		});

		editor.ui.registry.addButton('editcomponent', {
			icon: 'edit-block',
			tooltip: 'Edit component',
			onAction: function () {
				const node: HTMLElement = editor.selection.getNode();
				const component: Element | null = editor.dom.getParent(node, '.component');

				if (!component) {
					return;
				}

				const componentTitle = component.querySelector('#component-title')?.textContent || '';
				const componentContent = component.querySelector('#component-content')?.textContent || '';
				const jiraIssueId = component.getAttribute('data-jiraissueid') || '';
				const jiraProjectId = component.getAttribute('data-jiraProjectId') || '';

				const payloadMessage: MessageEventOpenEditComponentModal = {
					message: 'OPEN_EDIT_COMPONENT_MODAL',
					componentData: {
						title: componentTitle,
						content: componentContent,
						jiraIssueId,
						jiraProjectId
					}
				};

				window.postMessage(payloadMessage);

				window.addEventListener('message', (event: MessageEvent<MessageEventEditComponentModal>) => {
					const data: MessageEventEditComponentModal = event.data;

					if (data.message !== 'EDIT_COMPONENT_MODAL') {
						return;
					}

					const { title, content, jiraIssueId } = data.componentData;

					console.log(content);
					component.querySelector('#component-title')!.textContent = title;
					component.querySelector('#component-content')!.textContent = content;

					if (jiraIssueId) {
						component.setAttribute('data-jiraIssueId', jiraIssueId);
					}
				});
			}
		});

		editor.ui.registry.addContextToolbar('component', {
			predicate: function (node: Element) {
				return node.classList.contains('component-wrapper');
			},
			items: 'editcomponent removecomponent',
			position: 'node',
			scope: 'node'
		});
	};

	return initializeComponent;
};

export { useComponent };
