import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_ISSUES_API_URI } from '../routes';
import type { ReadOneJiraIssue } from './types';

const readOneJiraIssueApi = async (
	issueId: string,
	accessToken?: string,
	refreshToken?: string,
	accessibleResourceId?: string
): Promise<AxiosResponse<ReadOneJiraIssue.ControllerResponse>> => {
	const url = `${JIRA_ISSUES_API_URI}/${issueId}?accessToken=${accessToken}&refreshToken=${refreshToken}&accessibleResourceId=${accessibleResourceId}`;

	const result = await axiosInstance.get<ReadOneJiraIssue.ControllerResponse>(url);

	return result;
};

export default readOneJiraIssueApi;
