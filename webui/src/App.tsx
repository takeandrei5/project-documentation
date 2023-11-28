import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mainTheme } from './assets/theme';
import { RouterProvider, StoreProvider } from './providers';
import { HotKeysProvider } from './providers/HotKeysProvider';
import { store } from './redux';
import { queryClient } from './utils/queryClientConfig';

const App: React.FC<{ msalInstance: PublicClientApplication }> = ({ msalInstance }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<MsalProvider instance={msalInstance}>
				<StoreProvider store={store}>
					<ThemeProvider theme={mainTheme}>
						<HotKeysProvider>
							<RouterProvider msalInstance={msalInstance} />
							<ToastContainer theme='dark' />
						</HotKeysProvider>
					</ThemeProvider>
				</StoreProvider>
			</MsalProvider>
		</QueryClientProvider>
	);
};

export default App;
