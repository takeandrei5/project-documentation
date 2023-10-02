import { type AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PROJECTS_API_URI } from '../routes';
import { type CreateProjectRequest } from './types';

const createProjectApi = async (data: CreateProjectRequest, organizationId: string): Promise<AxiosResponse> => {
	const url: string = stringFormat(PROJECTS_API_URI, { organizationId });

  const result = await axiosInstance.post<CreateProjectRequest>(url, data);

  return result;
};

export default createProjectApi;
