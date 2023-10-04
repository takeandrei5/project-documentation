export type VerticalMenuItemProps = {
  onClickHandler: (() => void);
  text: string;
  color?: string;
  iconName?: string;
  shortcut?: string;
}