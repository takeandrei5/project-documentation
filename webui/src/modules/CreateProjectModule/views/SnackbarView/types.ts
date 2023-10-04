export type SnackbarViewProps = {
  duration: number;
  isOpen: boolean;
  message: string;
  onSnackbarClosedHandler: () => void;
}