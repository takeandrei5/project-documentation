import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_PROJECTS_API_URI } from '../routes';
import { tryAddJiraQueryParams } from '../utils';
import type { ReadAllJiraProjects } from './types';

const readAllJiraProjectsApi = async (): Promise<AxiosResponse<ReadAllJiraProjects.ControllerResponse>> => {
	const url = tryAddJiraQueryParams(JIRA_PROJECTS_API_URI);

	const result = await axiosInstance.get<ReadAllJiraProjects.ControllerResponse>(url);

	return result;
};

export default readAllJiraProjectsApi;
