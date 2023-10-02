import { type AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { USERS_API_URI } from '../routes';

const createUserApi = async (): Promise<void> => {
	await axiosInstance.post<unknown, AxiosResponse<unknown>>(USERS_API_URI);
};

export default createUserApi;
