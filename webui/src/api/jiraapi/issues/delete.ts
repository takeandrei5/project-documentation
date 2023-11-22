import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_ISSUES_API_URI } from '../routes';
import { tryAddJiraQueryParams } from '../utils';

const deleteJiraIssueApi = async (issueId: string): Promise<AxiosResponse> => {
	const url = tryAddJiraQueryParams(`${JIRA_ISSUES_API_URI}/${issueId}`);

	const result = await axiosInstance.delete(url);

	return result;
};

export default deleteJiraIssueApi;
