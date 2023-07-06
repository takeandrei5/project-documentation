import { Auth0Provider } from '@auth0/auth0-react';
import { RouterProvider } from '@tanstack/router';
import { router } from './router';

function App() {

	return (
		<Auth0Provider
			domain={import.meta.env.VITE_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin
			}}>
			<RouterProvider router={router} />
		</Auth0Provider>
	);
}

declare module '@tanstack/router' {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

export default App;
