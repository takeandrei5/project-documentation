import { useQuery } from '@tanstack/react-query';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { readOneJiraProjectApi } from '../../../../api/jiraapi/index.ts';
import readOneJiraIssueApi from '../../../../api/jiraapi/issues/readOne.ts';
import type { ReadOneJiraIssue } from '../../../../api/jiraapi/issues/types.ts';
import type { Project } from '../../../../api/jiraapi/projects/types.ts';
import type { DropdownOption } from '../../../../components/DropdownFieldC/types.ts';
import type { ComponentFormValidationSchema } from '../CreateUpdateComponentFormDialog/schema.ts';

const useUpdateComponentForm = (getValues: UseFormGetValues<ComponentFormValidationSchema>) => {
	const jiraProjectIdValue: string = getValues('jiraProjectId');
	const jiraIssueIdValue: string = getValues('jiraIssueId');

  console.log(jiraProjectIdValue)
  console.log(jiraIssueIdValue)

  const { data: jiraProjectData, isLoading: isLoadingJiraProject } = useQuery(
		['project', jiraProjectIdValue],
		async () => {
			const apiResponse = await readOneJiraProjectApi(jiraProjectIdValue);

			return apiResponse.data;
		},
		{
			retry: false,
      enabled: !!jiraProjectIdValue
		}
	);

	const { data: jiraIssueData, isLoading: isLoadingJiraIssue } = useQuery(
		['issues', jiraProjectIdValue, jiraIssueIdValue],
		async () => {
			const apiResponse = await readOneJiraIssueApi(jiraIssueIdValue);

			return apiResponse.data;
		},
		{ enabled: !!jiraProjectIdValue && !!jiraIssueIdValue }
	);

	const mapJiraProjectToDropdownHandler = (project: Project): DropdownOption[] => {
		return [{ value: project.id, label: `${project.key}: ${project.name}` }];
	};

	const mapJiraIssueToDropdownHandler = (issue: ReadOneJiraIssue.Issue): DropdownOption[] => {
		return [{ value: issue.id, label: `${issue.key}: ${issue.summary}` }];
	};

	return {
		isLoadingJiraIssue,
		isLoadingJiraProject,
		jiraIssueData,
		jiraIssueIdValue,
		jiraProjectData,
		mapJiraProjectToDropdownHandler,
		mapJiraIssueToDropdownHandler
	};
};

export default useUpdateComponentForm;
