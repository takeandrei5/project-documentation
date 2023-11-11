import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_ISSUES_API_URI } from '../routes';
import { tryAddJiraQueryParams } from '../utils';
import type { ReadOneJiraIssue } from './types';

const readOneJiraIssueApi = async (issueId: string): Promise<AxiosResponse<ReadOneJiraIssue.ControllerResponse>> => {
	const url = tryAddJiraQueryParams(`${JIRA_ISSUES_API_URI}/${issueId}`);

	const result = await axiosInstance.get<ReadOneJiraIssue.ControllerResponse>(url);

	return result;
};

export default readOneJiraIssueApi;
