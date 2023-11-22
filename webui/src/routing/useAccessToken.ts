import { EventType, type AuthenticationResult, type EventMessage, type PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { useMutation } from '@tanstack/react-query';
import type { InternalAxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserApi } from '../api';
import { loginRequest } from '../utils/authConfig';
import axiosInstance, { injectAccessToken } from '../utils/axios';
import { CustomNavigationClient } from '../utils/navigationClient';

const useAccessToken = (msalInstance: PublicClientApplication) => {
	const [isAccessTokenInjected, setIsAccessTokenInjected] = useState<boolean>(false);

	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: createUserApi,
		mutationKey: ['createUser'],
		onSettled: () => localStorage.setItem('authenticationFlowFinished', 'true')
	});

	const navigationClient = new CustomNavigationClient(navigate);
	msalInstance.setNavigationClient(navigationClient);

	useEffect(() => {
		const addAccessToken = async () => {
			const accounts = msalInstance.getAllAccounts();
			const activeAccount: AccountInfo = accounts[0];

			const msalResponse = await msalInstance.acquireTokenSilent({
				...loginRequest,
				account: activeAccount
			});

			injectAccessToken(msalResponse.accessToken);
			setIsAccessTokenInjected(true);
			msalInstance.setActiveAccount(activeAccount);
		};
		addAccessToken();
	}, [msalInstance]);

	msalInstance.addEventCallback(async (event: EventMessage) => {
		if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
			const payload = event.payload as AuthenticationResult;
			const account = payload.account;

			msalInstance.setActiveAccount(account);

			injectAccessToken(payload.accessToken);
			setIsAccessTokenInjected(true);
			if (!localStorage.getItem('authenticationFlowFinished')) {
				mutate();
			}
		}
	});

	return { isAccessTokenInjected };
};

export default useAccessToken;
