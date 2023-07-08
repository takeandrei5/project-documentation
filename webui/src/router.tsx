import { Outlet, RootRoute, Route, Router } from '@tanstack/router';
import { MainLayout } from './layouts';
import { CreatePRDPage, HomePage, PRDPage } from './pages';

const rootRoute = new RootRoute({
	component: () => (
		<MainLayout>
			<Outlet />
		</MainLayout>
	)
});

const homePageRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const createPrdPageRoute = new Route({ getParentRoute: () => rootRoute, path: '/create-project-description', component: CreatePRDPage });
const prdIdPageRoute = new Route({ getParentRoute: () => rootRoute, path: '/project-description/$prdId', component: PRDPage });

const routeTree = rootRoute.addChildren([homePageRoute, createPrdPageRoute, prdIdPageRoute]);
const router = new Router({ routeTree });

declare module '@tanstack/router' {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

export { router };

