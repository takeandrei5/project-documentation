import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_PROJECTS_API_URI } from '../routes';
import { tryAddJiraQueryParams } from '../utils';
import type { ReadMultipleProjectIssues } from './types';

const readAllJiraIssuesApi = async (projectId: string): Promise<AxiosResponse<ReadMultipleProjectIssues.ControllerResponse>> => {
	const url = tryAddJiraQueryParams(`${JIRA_PROJECTS_API_URI}/${projectId}/issues`);

	const result = await axiosInstance.get<ReadMultipleProjectIssues.ControllerResponse>(url);

	return result;
};

export default readAllJiraIssuesApi;
