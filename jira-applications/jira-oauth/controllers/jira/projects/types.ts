export namespace ReadMultipleProjects {
	export type ControllerResponse = {
		projects: Project[];
		total: number;
	};

	export type Project = {
		id: number;
		key: string;
		name: string;
	};

	export type ApiResponse = {
		total: number;
		values: Project[];
	};
}
