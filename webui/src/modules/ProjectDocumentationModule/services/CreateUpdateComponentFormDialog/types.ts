export type MessageEventOpenComponentModal = {
	message: 'OPEN_CREATE_COMPONENT_MODAL';
};

export type MessageEventOpenEditComponentModal = {
	message: 'OPEN_EDIT_COMPONENT_MODAL';
	componentData?: MessageEventComponentData;
};

export type MessageEventCreateComponentModal = {
	message: 'CREATE_COMPONENT_MODAL';
	componentData: MessageEventComponentData;
};

export type MessageEventEditComponentModal = {
	message: 'EDIT_COMPONENT_MODAL';
	componentData: MessageEventComponentData;
};

export type MessageEventComponentData = {
	title: string;
	content: string;
	jiraProjectId: string;
	jiraIssueId?: string;
};

export enum ComponentFormState {
	CREATE = 'CREATE',
	EDIT = 'EDIT'
}
