import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: '/api',
	validateStatus: (status: number) => status < 500
});

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
	handleDates(response.data);
	return response;
});

function isIsoDateString(value: unknown): boolean {
	const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

	return !!value && typeof value === 'string' && isoDateFormat.test(value);
}

export function handleDates(body: any): void {
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

export { axiosInstance };
