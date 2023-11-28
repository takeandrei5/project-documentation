import { useQuery } from '@tanstack/react-query';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { readAllJiraIssuesApi, readAllJiraProjectsApi } from '../../../../api/jiraapi/index.ts';
import readOneJiraIssueApi from '../../../../api/jiraapi/issues/readOne.ts';
import type { ReadAllJiraProjectIssues } from '../../../../api/jiraapi/issues/types.ts';
import type { Project } from '../../../../api/jiraapi/projects/types.ts';
import type { DropdownOption } from '../../../../components/DropdownFieldC/types.ts';
import type { ComponentFormValidationSchema } from '../CreateUpdateComponentFormDialog/schema.ts';

const useCreateComponentForm = (getValues: UseFormGetValues<ComponentFormValidationSchema>, setValue: UseFormSetValue<ComponentFormValidationSchema>) => {
	const jiraProjectIdValue: string = getValues('jiraProjectId');
	const jiraIssueIdValue: string = getValues('jiraIssueId');

	const { data: jiraProjectsData, isLoading: isLoadingJiraProjects } = useQuery(
		['projects'],
		async () => {
			const apiResponse = await readAllJiraProjectsApi();

			return apiResponse.data;
		}
	);

	const { data: jiraIssueData, isLoading: isLoadingJiraIssues } = useQuery(
		['issues', jiraProjectIdValue],
		async () => {
			const apiResponse = await readAllJiraIssuesApi(jiraProjectIdValue);
			return apiResponse.data;
		},
		{ enabled: !!jiraProjectIdValue }
	);

	useQuery(
		['issues', jiraProjectIdValue, jiraIssueIdValue],
		async () => {
			const apiResponse = await readOneJiraIssueApi(jiraIssueIdValue);

			if (apiResponse.status === 200) {
				setValue('componentTitle', apiResponse.data.issue.summary, {
					shouldDirty: true,
					shouldTouch: true
				});
				setValue('componentDescription', apiResponse.data.issue.description, {
					shouldDirty: true,
					shouldTouch: true
				});
			}

			return apiResponse.data;
		},
		{ enabled: !!jiraProjectIdValue && !!jiraIssueIdValue }
	);

	const mapJiraProjectsToDropdownHandler = (projects: Project[]): DropdownOption[] => {
		return projects.map((project: Project) => {
			return { value: project.id, label: `${project.key}: ${project.name}` };
		});
	};

	const mapJiraIssuesToDropdownHandler = (issues: ReadAllJiraProjectIssues.Issue[]): DropdownOption[] => {
		return issues.map((issue: ReadAllJiraProjectIssues.Issue) => {
			return { value: issue.id, label: `${issue.key}: ${issue.summary}` };
		});
	};

	return {
		isLoadingJiraIssues,
		isLoadingJiraProjects,
		jiraIssueData,
		jiraIssueIdValue,
		jiraProjectsData,
		jiraProjectIdValue,
		mapJiraIssuesToDropdownHandler,
		mapJiraProjectsToDropdownHandler
	};
};

export default useCreateComponentForm;
