import type { PageDto } from '../pages/types';

export type CreateProjectRequest = {
	name: string;
};

export type ProjectListDto = {
	projects: ProjectItemDto[];
};

export type ProjectItemDto = {
	id: string;
	name: string;
	iconName?: string;
};

export type ProjectDto = {
  id: string;
	name: string;
	pages: PageDto[]
}