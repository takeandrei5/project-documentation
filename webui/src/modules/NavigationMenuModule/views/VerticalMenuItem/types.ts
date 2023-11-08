import type { MuiIcon } from '../../../../components/IconPickerC/types';

export type VerticalMenuItemProps = {
  onClickHandler: (() => void);
  text: string;
  color?: string;
  icon?: MuiIcon;
  shortcut?: string;
}