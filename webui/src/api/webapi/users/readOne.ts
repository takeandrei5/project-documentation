import { type AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { USERS_API_URI } from '../routes';
import type { UserDto } from './types';

const readOneUserApi = async (): Promise<AxiosResponse<UserDto, unknown>> => {
	const result = await axiosInstance.get<UserDto>(USERS_API_URI);

  return result;
};

export default readOneUserApi;
