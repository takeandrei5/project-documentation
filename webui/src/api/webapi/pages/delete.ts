import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PAGES_API_URI } from '../routes';

const deletePageApi = async (pageId: string, projectId: string, organizationId: string): Promise<AxiosResponse> => {
	const url = `${stringFormat(PAGES_API_URI, { projectId, organizationId })}/${pageId}`;

  const result = await axiosInstance.delete(url);

  return result;
};

export default deletePageApi;
