import axios from 'axios';

const createDefaultAxiosInstance = (baseURL: string = '') => {
	return axios.create({
		baseURL,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
    validateStatus: () => true
	});
};

const defaultAxiosInstance = createDefaultAxiosInstance();

export { createDefaultAxiosInstance, defaultAxiosInstance };
