import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_AUTH_API_URI } from '../routes';

const jiraAuthApi = async (): Promise<AxiosResponse> => {
	const url = tryAddJiraQueryParams(JIRA_AUTH_API_URI);

	const result = await axiosInstance.get(url);

	return result;
};

export default jiraAuthApi;
