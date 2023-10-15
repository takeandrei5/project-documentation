import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PAGES_API_URI } from '../routes';
import type { UpdateOnePageRequest } from './types';

const updateOnePageApi = async (data: UpdateOnePageRequest, pageId: string, projectId: string, organizationId: string): Promise<AxiosResponse<UpdateOnePageRequest>> => {
	const url = `${stringFormat(PAGES_API_URI, { projectId, organizationId })}/${pageId}`;

	const result = await axiosInstance.patch<UpdateOnePageRequest>(url, data);

	return result;
};

export default updateOnePageApi;
