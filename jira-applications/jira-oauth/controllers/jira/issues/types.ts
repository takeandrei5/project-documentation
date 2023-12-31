export type Description = {
	version: number;
	type: string;
	content: ContentEntity[];
};

export type ContentEntity = {
	type: string;
	content: TextContentEntity[];
};

export type TextContentEntity = {
	type: string;
	text: string;
};

export namespace ReadOneJiraIssue {
	export type ApiResponse = {
    id: string;
		self: string;
		key: string;
		fields: Fields;
  };

	export type Issue = {
    id: string;
		key: string;
		summary: string;
		description: string;
	};

	export type ControllerResponse = {
		issue: Issue;
	};

	export interface Fields {
		summary: string;
		description: Description;
	}
}

export namespace UpdateOneJiraIssue {
	export type ControllerRequest = {
		summary: string;
		description: string;
	};

	export type ApiRequest = {
		fields: {
			summary: string;
			description: Description;
		};
	};
}

export namespace CreateOneJiraIssue {
	export type ControllerRequest = {
		summary: string;
		description: string;
		projectId: string;
	};

	export type ControllerResponse = {
		id: string;
	};

	export type ApiRequest = {
		fields: {
			summary: string;
			description: Description;
			issuetype: IdObject;
			project: IdObject;
		};
	};

	export type ApiResponse = {
		id: string;
		key: string;
	};

	export type IdObject = {
		id: string;
	};
}
