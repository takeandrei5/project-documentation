import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PAGES_API_URI } from '../routes';
import type { PageDto } from './types';

const readOnePageApi = async (pageId: string, projectId: string, organizationId: string): Promise<AxiosResponse<PageDto>> => {
	const url = `${stringFormat(PAGES_API_URI, { projectId, organizationId })}/${pageId}`;

  const result = await axiosInstance.get<PageDto>(url);

  return result;
};

export default readOnePageApi;
