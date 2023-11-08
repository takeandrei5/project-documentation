import { Auth0Provider, type AppState } from '@auth0/auth0-react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useNavigate } from 'react-router-dom';
import { mainTheme } from './assets/theme';
import { RouterProvider, StoreProvider } from './providers';
import { HotKeysProvider } from './providers/HotKeysProvider';
import { store } from './redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
	const navigate = useNavigate();
	const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        cacheTime: 5 * 60 * 1000,
        retry: Infinity
      }
    }
  });

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
				onRedirectCallback={(appState?: AppState) => {
					navigate(appState?.returnTo || window.location.pathname, { replace: true });
				}}
				useRefreshTokens
				useRefreshTokensFallback
				cacheLocation='localstorage'>
				<StoreProvider store={store}>
					<ThemeProvider theme={mainTheme}>
						<HotKeysProvider>
							<RouterProvider />
              <ToastContainer theme='dark' />
						</HotKeysProvider>
					</ThemeProvider>
				</StoreProvider>
			</Auth0Provider>
		</QueryClientProvider>
	);
};

export default App;
