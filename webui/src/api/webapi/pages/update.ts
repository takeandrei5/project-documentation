import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PAGES_API_URI } from '../routes';
import type { UpdatePageRequest } from './types';

const updatePageApi = async (data: UpdatePageRequest, pageId: string, projectId: string, organizationId: string): Promise<AxiosResponse<UpdatePageRequest>> => {
	const url = `${stringFormat(PAGES_API_URI, { projectId, organizationId })}/${pageId}`;

  const result = await axiosInstance.post<UpdatePageRequest>(url, data);

  return result;
};

export default updatePageApi;
