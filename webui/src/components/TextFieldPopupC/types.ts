import type { PopoverOrigin, PopoverPosition } from '@mui/material';

export type TextFieldPopupCProps = {
	anchorEl: HTMLElement;
	initialTextFieldValue: string;
	onClosePopupCallback: (newPageName: string) => void;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
};
