import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/router';
import { mainTheme } from './assets/theme';
import { router } from './router';

function App() {
	const queryClient: QueryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Auth0Provider
				domain={import.meta.env.VITE_AUTH0_DOMAIN}
				clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
				authorizationParams={{
					redirect_uri: window.location.origin
				}}>
				<ThemeProvider theme={mainTheme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</Auth0Provider>
		</QueryClientProvider>
	);
}

export default App;
