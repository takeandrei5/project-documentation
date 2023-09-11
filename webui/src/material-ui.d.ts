import type { PaletteOptions, Palette } from '@mui/material/styles/createPalette';
import type { TypographyVariants, CSSProperties } from '@mui/material/styles/styles';
import type { TypographyPropsVariantOverrides } from '@mui/material/Typography';

type TypographyVariantsOptions = {
	regular: React.CSSProperties;
	medium: React.CSSProperties;
	semiBold: React.CSSProperties;
	bold: React.CSSProperties;
};

declare module '@mui/material/styles/createPalette' {
	export interface Palette {
		purple: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		blue: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		cyan: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		greenLight: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		greenDark: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		yellow: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		orange: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		red: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		magenta: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		lightPurple: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		textColor: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			0: string;
		};
		disabled: {
			default: string;
		};
	}

	export interface PaletteOptions {
		purple: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		blue: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		cyan: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		greenLight: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		greenDark: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		yellow: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		orange: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		red: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		magenta: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		lightPurple: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			10: string;
		};
		textColor: {
			100: string;
			80: string;
			60: string;
			40: string;
			20: string;
			0: string;
		};
		disabled: {
			default: string;
		};
	}
}

declare module '@mui/material/styles' {
	export interface TypographyVariants {
		extraSmallRegular: React.CSSProperties;
		extraSmallMedium: React.CSSProperties;
		extraSmallSemiBold: React.CSSProperties;
		extraSmallBold: React.CSSProperties;

		smallRegular: React.CSSProperties;
		smallMedium: React.CSSProperties;
		smallSemiBold: React.CSSProperties;
		smallBold: React.CSSProperties;

		mediumRegular: React.CSSProperties;
		mediumMedium: React.CSSProperties;
		mediumSemiBold: React.CSSProperties;
		mediumBold: React.CSSProperties;

		largeRegular: React.CSSProperties;
		largeMedium: React.CSSProperties;
		largeSemiBold: React.CSSProperties;
		largeBold: React.CSSProperties;

		extraLargeRegular: React.CSSProperties;
		extraLargeMedium: React.CSSProperties;
		extraLargeSemiBold: React.CSSProperties;
		extraLargeBold: React.CSSProperties;
	}

	export interface TypographyVariantsOptions {
		extraSmallRegular?: React.CSSProperties;
		extraSmallMedium?: React.CSSProperties;
		extraSmallSemiBold?: React.CSSProperties;
		extraSmallBold?: React.CSSProperties;

		smallRegular?: React.CSSProperties;
		smallMedium?: React.CSSProperties;
		smallSemiBold?: React.CSSProperties;
		smallBold?: React.CSSProperties;

		mediumRegular?: React.CSSProperties;
		mediumMedium?: React.CSSProperties;
		mediumSemiBold?: React.CSSProperties;
		mediumBold?: React.CSSProperties;

		largeRegular?: React.CSSProperties;
		largeMedium?: React.CSSProperties;
		largeSemiBold?: React.CSSProperties;
		largeBold?: React.CSSProperties;

		extraLargeRegular?: React.CSSProperties;
		extraLargeMedium?: React.CSSProperties;
		extraLargeSemiBold?: React.CSSProperties;
		extraLargeBold?: React.CSSProperties;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		extraSmallRegular: true;
		extraSmallMedium: true;
		extraSmallSemiBold: true;
		extraSmallBold: true;

		smallRegular: true;
		smallMedium: true;
		smallSemiBold: true;
		smallBold: true;

		mediumRegular: true;
		mediumMedium: true;
		mediumSemiBold: true;
		mediumBold: true;

		largeRegular: true;
		largeMedium: true;
		largeSemiBold: true;
		largeBold: true;

		extraLargeRegular: true;
		extraLargeMedium: true;
		extraLargeSemiBold: true;
		extraLargeBold: true;
	}
}
