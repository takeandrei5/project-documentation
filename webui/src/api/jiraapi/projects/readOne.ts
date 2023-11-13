import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { JIRA_PROJECTS_API_URI } from '../routes';
import { tryAddJiraQueryParams } from '../utils';
import type { ReadOneJiraProject } from './types';

const readOneJiraProjectApi = async (id: string): Promise<AxiosResponse<ReadOneJiraProject.ControllerResponse>> => {
	const url = tryAddJiraQueryParams(`${JIRA_PROJECTS_API_URI}/${id}`);

	const result = await axiosInstance.get<ReadOneJiraProject.ControllerResponse>(url);

	return result;
};

export default readOneJiraProjectApi;
