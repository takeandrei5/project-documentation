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
		}
	},
	typography: {
		fontFamily: 'Inter, sans-serif',
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
