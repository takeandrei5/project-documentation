import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PAGES_API_URI } from '../routes';
import type { CreatePageRequest } from './types';

const createPageApi = async (data: CreatePageRequest, projectId: string, organizationId: string): Promise<AxiosResponse<CreatePageRequest>> => {
	const url: string = stringFormat(PAGES_API_URI, { projectId, organizationId });

  const result = await axiosInstance.post<CreatePageRequest>(url, data);

  return result;
};

export default createPageApi;
