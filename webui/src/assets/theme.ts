import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
	palette: {
		purple: {
			100: '#110D59',
			80: '#28246F',
			60: '#44408A',
			40: '#7E7BB2',
			20: '#B4B1E5',
			10: '#DAD9F5'
		},
		blue: {
			100: '#08437A',
			80: '#0B5FAE',
			60: '#0E77D9',
			40: '#3F9CF2',
			20: '#A3D1FC',
			10: '#CFE8FF'
		},
		cyan: {
			100: '#005F84',
			80: '#2086AD',
			60: '#3FA0C6',
			40: '#6AB8D6',
			20: '#9FD1E4',
			10: '#D5ECF5'
		},
		greenLight: {
			100: '#039267',
			80: '#1AC391',
			60: '#55E7BB',
			40: '#95F4D8',
			20: '#C7F8E9',
			10: '#D9FCF1'
		},
		greenDark: {
			100: '#49950D',
			80: '#5FB918',
			60: '#76DE24',
			40: '#9AEC59',
			20: '#C2F799',
			10: '#DDFBC5'
		},
		yellow: {
			100: '#D39405',
			80: '#ECAA18',
			60: '#FFBC26',
			40: '#FFCC5A',
			20: '#FDE2A1',
			10: '#FCE9C0'
		},
		orange: {
			100: '#DF6F0B',
			80: '#F18524',
			60: '#FEB371',
			40: '#F9BC87',
			20: '#FDD5B2',
			10: '#FFECDC'
		},
		red: {
			100: '#980808',
			80: '#C91616',
			60: '#F14D4D',
			40: '#FF7878',
			20: '#FBB4B4',
			10: '#FCDBDB'
		},
		magenta: {
			100: '#930C6D',
			80: '#C11390',
			60: '#E924B1',
			40: '#F173CE',
			20: '#F8B0E4',
			10: '#FED5F2'
		},
		lightPurple: {
			100: '#800C93',
			80: '#AF20C7',
			60: '#C750DB',
			40: '#D97DE9',
			20: '#E3A7ED',
			10: '#F3CEFA'
		},
		textColor: {
			100: '#2B283D',
			80: '#4C4958',
			60: '#55555F',
			40: '#7D7A89',
			20: '#B3B1BB',
			0: '#FFFFFF'
		},
		background: {
			default: '#F1F2F4'
		},
		common: {
			white: '#FFFFFF',
			black: '#2B283D'
		},
		disabled: {
			default: '#E3E4E8'
		}
	},
	typography: {
		fontFamily: 'Manrope, sans-serif',
		extraSmallRegular: {
			color: '#2B283D',
			fontSize: '0.75rem',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: '1.125rem',
			letterSpacing: '0.015rem'
		},
		extraSmallMedium: {
			color: '#2B283D',
			fontSize: '0.75rem',
			fontStyle: 'normal',
			fontWeight: 500,
			lineHeight: '1.125rem',
			letterSpacing: '0.015rem'
		},
		extraSmallSemiBold: {
			color: '#2B283D',
			fontSize: '0.75rem',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '1.125rem',
			letterSpacing: '0.015rem'
		},
		extraSmallBold: {
			color: '#2B283D',
			fontSize: '0.75rem',
			fontStyle: 'normal',
			fontWeight: 700,
			lineHeight: '1.125rem',
			letterSpacing: '0.015rem'
		},
		smallRegular: {
			color: '#2B283D',
			fontSize: '0.875rem',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: '1.3125rem',
			letterSpacing: '0.0175rem'
		},
		smallMedium: {
			color: '#2B283D',
			fontSize: '0.875rem',
			fontStyle: 'normal',
			fontWeight: 500,
			lineHeight: '1.3125rem',
			letterSpacing: '0.0175rem'
		},
		smallSemiBold: {
			color: '#2B283D',
			fontSize: '0.875rem',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '1.3125rem',
			letterSpacing: '0.0175rem'
		},
		smallBold: {
			color: '#2B283D',
			fontSize: '0.875rem',
			fontStyle: 'normal',
			fontWeight: 700,
			lineHeight: '1.3125rem',
			letterSpacing: '0.0175rem'
		},
		mediumRegular: {
			color: '#2B283D',
			fontSize: '1rem',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: '1.3rem',
			letterSpacing: '0.02rem'
		},
		mediumMedium: {
			color: '#2B283D',
			fontSize: '1rem',
			fontStyle: 'normal',
			fontWeight: 500,
			lineHeight: '1.3rem',
			letterSpacing: '0.02rem'
		},
		mediumSemiBold: {
			color: '#2B283D',
			fontSize: '1rem',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '1.3rem',
			letterSpacing: '0.02rem'
		},
		mediumBold: {
			color: '#2B283D',
			fontSize: '1rem',
			fontStyle: 'normal',
			fontWeight: 700,
			lineHeight: '1.3rem',
			letterSpacing: '0.02rem'
		},
		largeRegular: {
			color: '#2B283D',
			fontSize: '1.25rem',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: '1.5rem',
			letterSpacing: '0.025rem'
		},
		largeMedium: { color: '#2B283D', fontSize: '1.25rem', fontStyle: 'normal', fontWeight: 500, lineHeight: '1.5rem', letterSpacing: '0.025rem' },
		largeSemiBold: { color: '#2B283D', fontSize: '1.25rem', fontStyle: 'normal', fontWeight: 600, lineHeight: '1.5rem', letterSpacing: '0.025rem' },
		largeBold: { color: '#2B283D', fontSize: '1.25rem', fontStyle: 'normal', fontWeight: 700, lineHeight: '1.5rem', letterSpacing: '0.025rem' },
		extraLargeRegular: {
			color: '#2B283D',
			fontSize: '1.625rem',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: '1.95rem',
			letterSpacing: '0.0325rem'
		},
		extraLargeMedium: { color: '#2B283D', fontSize: '1.625rem', fontStyle: 'normal', fontWeight: 500, lineHeight: '1.95rem', letterSpacing: '0.0325rem' },
		extraLargeSemiBold: { color: '#2B283D', fontSize: '1.625rem', fontStyle: 'normal', fontWeight: 600, lineHeight: '1.95rem', letterSpacing: '0.0325rem' },
		extraLargeBold: { color: '#2B283D', fontSize: '1.625rem', fontStyle: 'normal', fontWeight: 700, lineHeight: '1.95rem', letterSpacing: '0.0325rem' }
	},
});
