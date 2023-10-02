import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { ORGANIZATIONS_API_URI } from '../routes';
import { type CreateOrganizationRequest } from './types';

const createOrganizationApi = async (data: CreateOrganizationRequest): Promise<AxiosResponse<null, AxiosRequestConfig<unknown>>> => {
	const result = await axiosInstance.post<unknown, AxiosResponse<null, AxiosRequestConfig<unknown>>, CreateOrganizationRequest>(ORGANIZATIONS_API_URI, data);

  return result;
};

export default createOrganizationApi;
