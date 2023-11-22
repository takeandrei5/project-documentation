export type Project = {
  id: string;
  key: string;
  name: string;
};

export namespace ReadOneJiraProject {
	export type ControllerResponse = {
		project: Project;
	};

	export type ApiResponse = Project;
}

export namespace ReadAllJiraProjects {
	export type ControllerResponse = {
		projects: Project[];
		total: number;
	};
}
