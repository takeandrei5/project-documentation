import hexToRgba from 'hex-to-rgba';
import type { ButtonCColorStyles, ButtonCSize, ButtonCSizeStyles, ButtonCVariant } from './types';
import { type Theme, useTheme } from '@mui/material';

const useButtonC = () => {
	const theme: Theme = useTheme();

	const sizeStyles: { [key in ButtonCSize]: ButtonCSizeStyles } = {
		large: { padding: '0.94rem 1.5rem', fontWeight: 600 },
		medium: { padding: '0.75rem 1.25rem', fontWeight: 600 },
		small: { padding: '0.375rem 0.875rem', fontWeight: 500 }
	};

	const variantStyles: { [key in ButtonCVariant]: ButtonCColorStyles } = {
		primary: {
			color: theme.palette.textColor[0],
			backgroundColor: theme.palette.blue[80],
			'&:active': { backgroundColor: `${theme.palette.blue[60]} !important` },
			'&:hover': { backgroundColor: theme.palette.blue[100] },
			'&:disabled': { backgroundColor: theme.palette.disabled.default, cursor: 'default' }
		},
		secondary: {
			color: theme.palette.blue[80],
			backgroundColor: hexToRgba(theme.palette.blue[80], 0.1),
			'&:active': { backgroundColor: `${hexToRgba(theme.palette.blue[80], 0.15)} !important` },
			'&:hover': { backgroundColor: hexToRgba(theme.palette.blue[80], 0.05) },
			'&:disabled': { backgroundColor: theme.palette.disabled.default, color: theme.palette.textColor[0], cursor: 'default' }
		}
	};

	return { sizeStyles, variantStyles };
};

export default useButtonC;
