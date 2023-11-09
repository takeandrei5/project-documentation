import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_ISSUES_API_URI } from '../routes';
import type { CreateOneJiraIssue } from './types';

const createJiraIssueApi = async (
	summary: string,
	description: string,
	projectId: string,
	accessToken?: string,
	refreshToken?: string,
	accessibleResourceId?: string
): Promise<AxiosResponse<CreateOneJiraIssue.ControllerResponse>> => {
	const url = `${JIRA_ISSUES_API_URI}?accessToken=${accessToken}&refreshToken=${refreshToken}&accessibleResourceId=${accessibleResourceId}`;

	const result = await axiosInstance.post<CreateOneJiraIssue.ControllerResponse, AxiosResponse<CreateOneJiraIssue.ControllerResponse>, CreateOneJiraIssue.ControllerRequest>(url, {
		summary,
		description,
		projectId
	});

	return result;
};

export default createJiraIssueApi;
