import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider} from '@mui/material'
import {mainTheme} from './assets/theme'
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
    <ThemeProvider theme={mainTheme}>

    <App />
    </ThemeProvider>

  </React.StrictMode>
)

