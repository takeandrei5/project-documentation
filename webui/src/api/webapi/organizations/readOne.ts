import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { ORGANIZATIONS_API_URI } from '../routes';
import type { OrganizationDto } from './types';

const readOnePageApi = async (organizationId: string): Promise<AxiosResponse<OrganizationDto>> => {
	const url = `${ORGANIZATIONS_API_URI}/${organizationId}`;

  const result = await axiosInstance.get<OrganizationDto>(url);

  return result;
};

export default readOnePageApi;
