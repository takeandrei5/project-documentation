import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_PROJECTS_API_URI } from '../routes';
import type { ReadMultipleProjectIssues } from './types';

const readAllJiraIssuesApi = async (
	projectId: string,
	accessToken?: string,
	refreshToken?: string,
	accessibleResourceId?: string
): Promise<AxiosResponse<ReadMultipleProjectIssues.ControllerResponse>> => {
	const url = `${JIRA_PROJECTS_API_URI}/${projectId}/issues?accessToken=${accessToken}&refreshToken=${refreshToken}&accessibleResourceId=${accessibleResourceId}`;

	const result = await axiosInstance.get<ReadMultipleProjectIssues.ControllerResponse>(url);

	return result;
};

export default readAllJiraIssuesApi;
