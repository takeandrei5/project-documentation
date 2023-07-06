import { RootRoute, Route, Router } from '@tanstack/router';
import { DashboardPage, HomePage } from './pages';

const rootRoute = new RootRoute();

const homePageRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const dashboardPageRoute = new Route({ getParentRoute: () => rootRoute, path: '/dashboard', component: DashboardPage });

const routeTree = rootRoute.addChildren([homePageRoute, dashboardPageRoute]);
const router = new Router({ routeTree })

export { router };
