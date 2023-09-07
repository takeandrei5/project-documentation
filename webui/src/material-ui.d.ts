import type { PaletteOptions, Palette } from "@mui/material/styles/createPalette";
import type { TypographyVariants, CSSProperties } from "@mui/material/styles/styles";
import type { TypographyPropsVariantOverrides } from "@mui/material/Typography";

type TypographyVariantsOptions = {
  regular: React.CSSProperties;
  medium: React.CSSProperties;
  semiBold: React.CSSProperties;
  bold: React.CSSProperties;
}

declare module "@mui/material/styles/createPalette" {
  export interface Palette {
    purple: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    blue: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    cyan: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    greenLight: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    greenDark: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    yellow: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    orange: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    red: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    magenta: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    lightPurple: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    textColor: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      0: string;
    },
    disabled: {
      default: string;
    }
  }

  export interface PaletteOptions {
    purple: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    blue: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    cyan: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    greenLight: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    greenDark: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    yellow: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    orange: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    red: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    magenta: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    lightPurple: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      10: string;
    },
    textColor: {
      100: string;
      80: string;
      60: string;
      40: string;
      20: string;
      0: string;
    },
    disabled: {
      default: string;
    }
  }
}

declare module "@mui/material/styles" {
  export interface TypographyVariants {
    extraSmall: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    },
    small: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    },
    medium: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    },
    large: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    },
    extraLarge: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    }
  }

  export interface TypographyVariantsOptions {
    extraSmall?: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    },
    small?: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    },
    medium?: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    },
    large?: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    },
    extraLarge?: {
      regular: React.CSSProperties;
      medium: React.CSSProperties;
      semiBold: React.CSSProperties;
      bold: React.CSSProperties;
    }
  }
}

declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {
    extraSmall: {
      regular: true;
      medium: true;
      semiBold: true;
      bold: true;
    },
    small: {
      regular: true;
      medium: true;
      semiBold: true;
      bold: true;
    },
    medium: {
      regular: true;
      medium: true;
      semiBold: true;
      bold: true;
    },
    large: {
      regular: true;
      medium: true;
      semiBold: true;
      bold: true;
    },
    extraLarge: {
      regular: true;
      medium: true;
      semiBold: true;
      bold: true;
    }
  }
}