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
	export type ApiResponse = {
		id: string;
		self: string;
		key: string;
		fields: Fields;
	};

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

  export type ApiRequest = {
    summary: string;
    description: Description;
  }
}
