import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
	palette: {
		primary: {
			light: '#7fd9f1',
			main: '#0b717f',
			dark: '#25b9cf',
			contrastText: '#FFFFFF'
		},
		secondary: {
			light: '#FF0000',
			main: '#CC4949',
			dark: '#sb10303'
		},
		action: {
			//      disabledBackground: '#b4b4b4',
			//      disabled: '#FFFFFF',
		},
		info: {
			light: '#709fea',
			main: '#3E64D7',
			dark: '#2d41a0'
		},
		success: {
			light: '#33f57c',
			main: '#00ab41',
			dark: '#0a7132'
		},
		error: {
			light: '#ff5757',
			main: '#FF0000',
			dark: '#b10303'
		},
		warning: {
			light: '#ffda46',
			main: '#ffa500',
			dark: '#bb5502'
		},
		background: {
			default: '#F5F5F5',
			//      paper: '#F9FBFD'
			paper: '#FFFFFF'
		},
		common: {
			white: '#FFFFFF',
			black: '#000000'
		}
	},
	typography: {
		fontFamily: 'Roboto, sans-serif',
		subtitle1: {
			fontSize: '1.25rem'
		},
		subtitle2: {
			fontSize: '1rem'
		},
		body1: {
			fontSize: '0.875rem'
		},
		body2: {
			fontSize: '0.75rem'
		},
		button: {
			fontSize: '0.875rem',
			fontWeight: 500
		}
	}
});
