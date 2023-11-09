import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_ISSUES_API_URI } from '../routes';
import type { UpdateOneJiraIssue } from './types';

const updateJiraIssueApi = async (summary: string, description: string, issueId: string): Promise<AxiosResponse> => {
	const url = tryAddJiraQueryParams(`${JIRA_ISSUES_API_URI}/${issueId}`);

	const result = await axiosInstance.post<UpdateOneJiraIssue.ControllerRequest>(url, {
		summary,
		description
	});

	return result;
};

export default updateJiraIssueApi;
