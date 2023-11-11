import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_AUTH_API_URI } from '../routes';
import { tryAddJiraQueryParams } from '../utils';
import type { OAuthRefreshTokenResponse } from './types';

const jiraAuthApi = async (): Promise<AxiosResponse<OAuthRefreshTokenResponse>> => {
	const url = tryAddJiraQueryParams(JIRA_AUTH_API_URI);

	const result = await axiosInstance.get<OAuthRefreshTokenResponse>(url);

	if (result.status === 200) {
		localStorage.setItem('accessToken', result.data.access_token);
		localStorage.setItem('refreshToken', result.data.refresh_token);
	}

	return result;
};

export default jiraAuthApi;
