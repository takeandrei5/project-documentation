import { type AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { ORGANIZATIONS_API_URI } from '../routes';
import { type CreateOrganizationRequest } from './types';

const createOrganizationApi = async (data: CreateOrganizationRequest): Promise<AxiosResponse<CreateOrganizationRequest>> => {
	const result = await axiosInstance.post<CreateOrganizationRequest>(ORGANIZATIONS_API_URI, data);

  return result;
};

export default createOrganizationApi;
