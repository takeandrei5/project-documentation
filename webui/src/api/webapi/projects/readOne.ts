import axiosInstance from '../../../utils/axios';
import { stringFormat } from '../../../utils/helpers';
import { PROJECTS_API_URI } from '../routes';
import type { ProjectDto } from './types';

const readOneProjectApi = async (projectId: string, organizationId: string): Promise<ProjectDto> => {
	const url = `${stringFormat(PROJECTS_API_URI, { organizationId })}/${projectId}`;

	const result = await axiosInstance.get<ProjectDto>(url);

  if (result.status >= 400) {
    throw new Error(result.statusText)
  }

	return result.data;
};

export default readOneProjectApi;
