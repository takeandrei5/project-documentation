import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { axiosInstance } from '../../../utils/axios';
import { PROJECTS_API_URI } from '../routes';
import { type CreateProjectRequest } from './types';

const createProjectApi = async (data: CreateProjectRequest): Promise<AxiosResponse<null, AxiosRequestConfig<unknown>>> => {
	return await axiosInstance.post<unknown, AxiosResponse<null, AxiosRequestConfig<unknown>>, CreateProjectRequest>(PROJECTS_API_URI, data);
};

export default createProjectApi;
