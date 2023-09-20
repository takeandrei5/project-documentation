import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createUserApi } from '../../api';
import { injectAccessToken } from '../../utils/axios';

const useAuth0LoginProvider = () => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();
	const [accessToken, setAccessToken] = useState<string>('');

	const { mutate } = useMutation({
		mutationFn: createUserApi,
		mutationKey: ['createUser'],
		onSettled: () => localStorage.setItem('authenticationFlowFinished', 'true')
	});

	useEffect(() => {
		const getAccessToken = async () => {
			try {
				const token = await getAccessTokenSilently();
        console.log('token', token)
				setAccessToken(token);
			} catch (error) {
				console.log(error);
			}
		};

		if (!isAuthenticated) {
			return;
		}

		getAccessToken();
	}, [getAccessTokenSilently, isAuthenticated]);

	useEffect(() => {
		if (!accessToken) {
			return;
		}

		injectAccessToken(accessToken);

    if (localStorage.getItem('authenticationFlowFinished')) {
      mutate();
    }
	}, [accessToken]);
};

export { useAuth0LoginProvider };
