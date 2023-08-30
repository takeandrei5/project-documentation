import { type AppState, Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useNavigate } from 'react-router-dom';
import { mainTheme } from './assets/theme';
import { Auth0LoginProvider, RouterProvider, StoreProvider } from './providers';
import { store } from './redux';

const App:React.FC = () => {
	const navigate = useNavigate();
	const queryClient:QueryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Auth0Provider
				domain={import.meta.env.VITE_AUTH0_DOMAIN}
				clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
				authorizationParams={{
					redirect_uri: window.location.origin,
					scope: 'openid profile email offline_access',
					audience: `https://product-documentation.eu.auth0.com/api/v2/`
				}}
				onRedirectCallback={(appState?:AppState) => {
					navigate(appState?.returnTo || window.location.pathname, { replace: true });
				}}
				useRefreshTokens
				cacheLocation='localstorage'
			>
				<Auth0LoginProvider>
					<StoreProvider store={store}>
						<ThemeProvider theme={mainTheme}>
							<RouterProvider />
						</ThemeProvider>
					</StoreProvider>
				</Auth0LoginProvider>
			</Auth0Provider>
		</QueryClientProvider>
	);
};

export default App;
