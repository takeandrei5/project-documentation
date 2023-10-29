import type { AxiosResponse } from 'axios';
import axiosInstance from '../../../../utils/axios';
import { JIRA_ISSUES_API_URI } from '../../routes';

const readAllJiraIssuesApi = async (): Promise<AxiosResponse> => {
  const result = await axiosInstance.get(JIRA_ISSUES_API_URI);

  return result;
};

export default readAllJiraIssuesApi;
