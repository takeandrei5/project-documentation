export namespace ReadMultipleProjectIssues {
	export type ControllerResponse = {
		issues: Issue[];
		total: number;
	};

	export type Issue = {
		id: string;
		key: string;
		summary: string;
	};
}

export interface Description {
	version: number;
	type: string;
	content: ContentEntity[];
}

export interface ContentEntity {
	type: string;
	content: TextContentEntity[];
}

export interface TextContentEntity {
	type: string;
	text: string;
}

export namespace ReadOneJiraIssue {
	export type ControllerResponse = {
		id: string;
		key: string;
		summary: string;
		description: string;
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

	export type IdObject = {
		id: string;
	};
}
