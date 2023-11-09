import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_PROJECTS_API_URI } from '../routes';
import type { ReadAllProjects } from './types';

const readAllJiraProjectsApi = async (): Promise<AxiosResponse<ReadAllProjects.ControllerResponse>> => {
	const url = tryAddJiraQueryParams(JIRA_PROJECTS_API_URI);

	const result = await axiosInstance.get<ReadAllProjects.ControllerResponse>(url);

	return result;
};

export default readAllJiraProjectsApi;
