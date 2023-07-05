import { RootRoute, Route } from '@tanstack/router';
import { Dashboard, Home } from './pages';

const rootRoute = new RootRoute();

const homeRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: Home });
const dashboardRoute = new Route({ getParentRoute: () => rootRoute, path: '/dashboard', component: Dashboard });

const routeTree = rootRoute.addChildren([homeRoute, dashboardRoute]);

export { routeTree };
