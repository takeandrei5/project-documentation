import { EventType, type AccountInfo, type AuthenticationResult, type EventMessage, type PublicClientApplication } from '@azure/msal-browser';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserApi } from '../api';
import { loginRequest } from '../utils/authConfig';
import { injectAccessToken } from '../utils/axios';
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
			if (accounts.length > 0) {
				msalInstance.setActiveAccount(accounts[0]);
			}

			if (msalInstance.getActiveAccount() === null) {
				return;
			}

			const msalResponse = await msalInstance.acquireTokenSilent({
				...loginRequest,
				account: msalInstance.getActiveAccount() as AccountInfo
			});

			injectAccessToken(msalResponse.accessToken);
			setIsAccessTokenInjected(true);
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
			if (!localStorage.getItem('authenticationFlowFinished') || !localStorage.getItem('authenticationFlowStarted')) {
				mutate();
				localStorage.setItem('authenticationFlowStarted', 'true');
			}
		}
	});

	return { isAccessTokenInjected };
};

export default useAccessToken;
