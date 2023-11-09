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
}
