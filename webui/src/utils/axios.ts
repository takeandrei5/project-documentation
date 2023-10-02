import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	validateStatus: (status: number) => status < 500
});

const injectAccessToken = (accessToken: string): void => {
  axiosInstance.defaults.headers.get.Authorization = `Bearer ${accessToken}`;
  axiosInstance.defaults.headers.put.Authorization = `Bearer ${accessToken}`;
  axiosInstance.defaults.headers.post.Authorization = `Bearer ${accessToken}`;
  axiosInstance.defaults.headers.delete.Authorization = `Bearer ${accessToken}`;
};

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
	handleDates(response.data);
	return response;
});

function isIsoDateString(value: unknown): boolean {
	const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

	return !!value && typeof value === 'string' && isoDateFormat.test(value);
}

function handleDates(body: any): void {
	if (!body || typeof body !== 'object') return;

	for (const key of Object.keys(body)) {
		const value = body[key];
		if (isIsoDateString(value)) {
			body[key] = new Date(value as string);
			continue;
		}

		if (typeof value === 'object') {
			handleDates(value);
		}
	}
}

export { injectAccessToken };
export default axiosInstance;
