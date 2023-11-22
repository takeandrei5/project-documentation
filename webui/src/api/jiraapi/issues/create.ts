import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_ISSUES_API_URI } from '../routes';
import { tryAddJiraQueryParams } from '../utils';
import type { CreateOneJiraIssue } from './types';

const createJiraIssueApi = async (summary: string, description: string, projectId: string): Promise<AxiosResponse<CreateOneJiraIssue.ControllerResponse>> => {
	const url = tryAddJiraQueryParams(JIRA_ISSUES_API_URI);

	const result = await axiosInstance.post<CreateOneJiraIssue.ControllerResponse, AxiosResponse<CreateOneJiraIssue.ControllerResponse>, CreateOneJiraIssue.ControllerRequest>(url, {
		summary,
		description,
		projectId
	});

	return result;
};

export default createJiraIssueApi;
