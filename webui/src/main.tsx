import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { msalInstance } from './utils/authConfig';

msalInstance.initialize().then(() => {
	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<React.StrictMode>
			<BrowserRouter>
				<App msalInstance={msalInstance} />
			</BrowserRouter>
		</React.StrictMode>
	);
});
