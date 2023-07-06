import { RouterProvider } from '@tanstack/router';
import { router } from './router';

function App() {
	return (
    <RouterProvider router={router} />
	);
}

declare module '@tanstack/router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}

export default App;
