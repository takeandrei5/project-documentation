import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_ISSUES_API_URI } from '../routes';
import type { UpdateOneJiraIssue } from './types';

const updateJiraIssueApi = async (
	summary: string,
	description: string,
	issueId: string,
	accessToken?: string,
	refreshToken?: string,
	accessibleResourceId?: string
): Promise<AxiosResponse> => {
	const url = `${JIRA_ISSUES_API_URI}/${issueId}?accessToken=${accessToken}&refreshToken=${refreshToken}&accessibleResourceId=${accessibleResourceId}`;

	const result = await axiosInstance.post<UpdateOneJiraIssue.ControllerRequest>(url, {
		summary,
		description
	});

	return result;
};

export default updateJiraIssueApi;
