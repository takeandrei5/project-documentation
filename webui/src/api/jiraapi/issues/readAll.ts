import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_PROJECTS_API_URI } from '../routes';
import { tryAddJiraQueryParams } from '../utils';
import type { ReadAllJiraProjectIssues } from './types';

const readAllJiraIssuesApi = async (projectId: string): Promise<AxiosResponse<ReadAllJiraProjectIssues.ControllerResponse>> => {
	const url = tryAddJiraQueryParams(`${JIRA_PROJECTS_API_URI}/${projectId}/issues`);

	const result = await axiosInstance.get<ReadAllJiraProjectIssues.ControllerResponse>(url);

	return result;
};

export default readAllJiraIssuesApi;
