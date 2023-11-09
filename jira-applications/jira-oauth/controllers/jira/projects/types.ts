export namespace ReadAllProjects {
	export type ControllerResponse = {
		projects: Project[];
		total: number;
	};

	export type Project = {
		id: number;
		key: string;
		name: string;
	};

	export type ApiResponse = Project[];
}

export namespace ReadAllProjectIssues {
	export type ControllerResponse = {
		issues: ControllerIssue[];
		total: number;
	};

  export type ControllerIssue = {
    id: string;
    key: string;
    summary: string;
  };

	export type ApiIssue = {
		id: string;
		key: string;
		fields: {
      summary: string;
    }
	};

	export type ApiResponse = {
		total: number;
		issues: ApiIssue[];
	};
}
