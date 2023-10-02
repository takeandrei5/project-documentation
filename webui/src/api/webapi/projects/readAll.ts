import { type AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { PROJECTS_API_URI } from '../routes';
import { stringFormat } from '../../../utils/helpers';
import { type ProjectListDto } from './types';

const readAllProjectsApi = async (organizationId: string): Promise<AxiosResponse<ProjectListDto, unknown>> => {
	const url: string = stringFormat(PROJECTS_API_URI, { organizationId });

	const result = await axiosInstance.get<ProjectListDto>(url);

	return result;
};

export default readAllProjectsApi;
