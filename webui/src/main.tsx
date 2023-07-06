import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { Router, RouterProvider } from '@tanstack/router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { routeTree } from './router';

// Create the router using your route tree
const router = new Router({ routeTree });

declare module '@tanstack/router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}

import App from './App.tsx'
import './index.css'
import {ThemeProvider} from '@mui/material'
import {mainTheme} from './assets/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <App/>
    </ThemeProvider>
//  </React.StrictMode>,
)
