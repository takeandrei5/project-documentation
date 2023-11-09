import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_PROJECTS_API_URI } from '../routes';
import type { ReadAllProjects } from './types';

const readAllJiraProjectsApi = async (accessToken?: string, refreshToken?: string, accessibleResourceId?: string): Promise<AxiosResponse<ReadAllProjects.ControllerResponse>> => {
	const url = `${JIRA_PROJECTS_API_URI}?accessToken=${accessToken}&refreshToken=${refreshToken}&accessibleResourceId=${accessibleResourceId}`;

	const result = await axiosInstance.get<ReadAllProjects.ControllerResponse>(url);

	return result;
};

export default readAllJiraProjectsApi;
