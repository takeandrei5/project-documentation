import axios from 'axios';

const createDefaultAxiosInstance = (baseURL: string = '') => {
	return axios.create({
		baseURL,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
};

const defaultAxiosInstance = createDefaultAxiosInstance();

export { createDefaultAxiosInstance, defaultAxiosInstance };
