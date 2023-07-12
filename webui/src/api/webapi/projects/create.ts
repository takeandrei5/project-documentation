import { axiosInstance } from '../../../utils/axios';
import { PROJECTS_API_URI } from '../routes';

import { type AxiosResponse } from 'axios';
import { type CreateProjectRequest } from './types';

const createProjectApi = async (data: CreateProjectRequest): Promise<void> => {
	await axiosInstance.post<unknown, AxiosResponse<unknown>, CreateProjectRequest>(PROJECTS_API_URI, data);
};

export default createProjectApi;
