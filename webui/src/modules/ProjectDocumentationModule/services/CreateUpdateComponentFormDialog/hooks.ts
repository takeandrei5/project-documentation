import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createJiraIssueApi, updateJiraIssueApi } from '../../../../api/jiraapi';
import { useDialogControl } from '../../../../hooks';
import { componentFormSchema, type ComponentFormValidationSchema } from './schema';
import {
	ComponentFormState,
	type MessageEventComponentData,
	type MessageEventCreateComponentModal,
	type MessageEventEditComponentModal,
	type MessageEventOpenComponentModal,
	type MessageEventOpenEditComponentModal
} from './types';

const useCreateUpdateComponentFormDialog = () => {
	const [componentFormState, setComponentFormState] = useState<ComponentFormState>(ComponentFormState.CREATE);

	const dialogControl = useDialogControl();

	const {
		control,
		getValues,
		setValue,
		reset,
		formState: { isValid, dirtyFields, touchedFields }
	} = useForm<ComponentFormValidationSchema>({
		resolver: zodResolver(componentFormSchema),
		defaultValues: {
			jiraProjectId: '',
			jiraIssueId: '',
			componentTitle: '',
			componentDescription: '',
			syncWithJira: false
		}
	});

	const { mutateAsync: createIssue } = useMutation(
		async ({ componentTitle, componentDescription, projectId }: { componentTitle: string; componentDescription: string; projectId: string }) => {
			const apiResponse = await createJiraIssueApi(componentTitle, componentDescription, projectId);

			return apiResponse.data;
		}
	);

	const { mutateAsync: updateIssue } = useMutation(
		async ({ componentTitle, componentDescription, issueId }: { componentTitle: string; componentDescription: string; issueId: string }) => {
			await updateJiraIssueApi(componentTitle, componentDescription, issueId);
		}
	);

	useEffect(() => {
		window.addEventListener('message', (event: MessageEvent<MessageEventOpenComponentModal | MessageEventOpenEditComponentModal>) => {
			const data = event.data;
			const isValidMessage = event.data.message === 'OPEN_CREATE_COMPONENT_MODAL' || event.data.message === 'OPEN_EDIT_COMPONENT_MODAL';

			if (!isValidMessage) {
				return;
			}

			if (data.message === 'OPEN_CREATE_COMPONENT_MODAL') {
				setComponentFormState(ComponentFormState.CREATE);
			}

			if (data.message === 'OPEN_EDIT_COMPONENT_MODAL') {
				setComponentFormState(ComponentFormState.EDIT);

				if (data.componentData) {
					setValue('jiraProjectId', data.componentData.jiraProjectId, {
						shouldDirty: true,
						shouldTouch: true
					});

					if (data.componentData.jiraIssueId) {
						setValue('jiraIssueId', data.componentData.jiraIssueId, {
							shouldDirty: true,
							shouldTouch: true
						});
					}

					setValue('componentTitle', data.componentData.title, {
						shouldDirty: true,
						shouldTouch: true
					});
					setValue('componentDescription', data.componentData.content, {
						shouldDirty: true,
						shouldTouch: true
					});
					setValue('syncWithJira', Boolean((data.componentData.title || data.componentData.content) && !data.componentData.jiraIssueId), {
						shouldDirty: true,
						shouldTouch: true
					});
				}
			}

			dialogControl.openHandler();
		});

		return () => {
			dialogControl.closeHandler();
		};
	}, []);

	function closeHandler(): void {
		reset();
		dialogControl.closeHandler();
		window.removeEventListener('message', () => {
			return;
		});
	}

	const importJiraIssue = async (): Promise<void> => {
		const { componentTitle, componentDescription, jiraIssueId, jiraProjectId } = getValues();

		if (!isValid) {
			return;
		}

		const componentData: MessageEventComponentData = {
			title: componentTitle,
			content: componentDescription,
			jiraProjectId,
			jiraIssueId
		};

		const payloadMessage = {
			message: 'CREATE_COMPONENT_MODAL',
			componentData
		};

		window.postMessage(payloadMessage);
		closeHandler();
	};

	const createComponent = async (): Promise<void> => {
		const { componentTitle, componentDescription, syncWithJira, jiraProjectId } = getValues();

		if (!isValid) {
			return;
		}

		const componentData: MessageEventComponentData = {
			title: componentTitle,
			content: componentDescription,
			jiraProjectId
		};

		if (syncWithJira) {
			const jiraIssue = await createIssue({ componentTitle, componentDescription, projectId: jiraProjectId });

			componentData.jiraIssueId = jiraIssue.id;
		}

		const payloadMessage: MessageEventCreateComponentModal = {
			message: 'CREATE_COMPONENT_MODAL',
			componentData
		};

		window.postMessage(payloadMessage);
		closeHandler();
	};

	const updateComponent = async (): Promise<void> => {
		const { componentTitle, componentDescription, jiraProjectId, jiraIssueId, syncWithJira } = getValues();

		if (!isValid) {
			return;
		}

		const componentData: MessageEventComponentData = {
			title: componentTitle,
			content: componentDescription,
			jiraProjectId
		};

		if (syncWithJira) {
			const jiraIssue = await createIssue({ componentTitle, componentDescription, projectId: jiraProjectId });

			componentData.jiraIssueId = jiraIssue.id;
		}

		if (jiraIssueId) {
			await updateIssue({ componentTitle, componentDescription, issueId: jiraIssueId });
		}

		const payloadMessage: MessageEventEditComponentModal = {
			message: 'EDIT_COMPONENT_MODAL',
			componentData
		};

		window.postMessage(payloadMessage);
		closeHandler();
	};

	return { createComponent, closeHandler, componentFormState, control, dialogControl, dirtyFields, getValues, importJiraIssue, setValue, touchedFields, updateComponent };
};

export { useCreateUpdateComponentFormDialog };
