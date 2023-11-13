export type Project = {
	id: string;
	key: string;
	name: string;
};

export namespace ReadAllProjects {
	export type ControllerResponse = {
		projects: Project[];
		total: number;
	};

	export type ApiResponse = Project[];
}

export namespace ReadOneProject {
	export type ControllerResponse = {
		project: Project;
	};

	export type ApiResponse = Project;
}

export namespace ReadAllProjectIssues {
	export type ControllerResponse = {
		issues: Issue[];
		total: number;
	};

	export type Issue = {
		id: string;
		key: string;
		summary: string;
	};

	export type ApiIssue = {
		id: string;
		key: string;
		fields: {
			summary: string;
		};
	};

	export type ApiResponse = {
		total: number;
		issues: ApiIssue[];
	};
}
