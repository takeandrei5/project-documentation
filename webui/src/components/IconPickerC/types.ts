import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { MUIIconKeys } from '../../utils/types';

export type IIconPickerCProps = {
	onIconSelectedHandler: (iconName: MUIIconKeys) => void;
	initialIcon?: MuiIcon;
};

export type MuiIconTabName = 'simple' | 'outlined' | 'rounded' | 'sharp' | 'twoTone';

export type MuiIconsTabs = {
	[key in MuiIconTabName]: MuiIconTab[];
};

export type MuiIconsTabsGrid = {
	[key in MuiIconTabName]: MuiIconTab[][];
};

export type MuiIconTab = [string, MuiIcon];

export type MuiIcon = OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
	muiName: string;
};
