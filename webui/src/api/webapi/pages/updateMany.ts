import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PAGES_API_URI } from '../routes';
import type { UpdateManyPageRequest } from './types';

const updateManyPageApi = async (data: UpdateManyPageRequest[], projectId: string, organizationId: string): Promise<AxiosResponse<UpdateManyPageRequest>> => {
	const url = `${stringFormat(PAGES_API_URI, { projectId, organizationId })}`;

  const result = await axiosInstance.patch<UpdateManyPageRequest>(url, data);

  return result;
};

export default updateManyPageApi;
