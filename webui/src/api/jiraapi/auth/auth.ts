import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_AUTH_API_URI } from '../routes';

const jiraAuthApi = async (accessToken?: string, refreshToken?: string, accessibleResourceId?: string): Promise<AxiosResponse> => {
	const url = `${JIRA_AUTH_API_URI}?accessToken=${accessToken}&refreshToken=${refreshToken}&accessibleResourceId=${accessibleResourceId}`;

	const result = await axiosInstance.get(url);

	return result;
};

export default jiraAuthApi;
