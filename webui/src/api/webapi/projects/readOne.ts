import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PROJECTS_API_URI } from '../routes';
import type { ProjectDto } from './types';

const readOneProjectApi = async (projectId: string, organizationId: string): Promise<AxiosResponse<ProjectDto, unknown>> => {
	const url = `${stringFormat(PROJECTS_API_URI, { organizationId })}/${projectId}`;

	const result = await axiosInstance.get<ProjectDto>(url);

	return result;
};

export default readOneProjectApi;
