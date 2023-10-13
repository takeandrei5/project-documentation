import type { PopoverOrigin, PopoverPosition } from '@mui/material';
import type { MUIIconKeys } from '../../utils/types';

export type TextFieldPopupCProps = {
	anchorEl: HTMLElement;
	initialTextFieldValue: string;
  initialIconValue: MUIIconKeys;
	onClosePopupCallback: (pageName: string, pageIconName: MUIIconKeys) => void;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
};

