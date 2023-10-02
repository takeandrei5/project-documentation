export type CreateProjectRequest = {
	projectName: string;
};

export type ProjectListDto = {
	projects: ProjectItemDto[];
};

export type ProjectItemDto = {
	id: string;
	name: string;
	iconName?: string;
};
