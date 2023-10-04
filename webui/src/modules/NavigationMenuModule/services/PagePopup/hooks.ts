import { useState } from 'react';

const usePagePopup = (initialPageName: string, onClosePopupCallback: (newPageName: string) => void) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
	const [newPageName, setNewPageName] = useState<string>(initialPageName);

	const onClosePagePopupHandler = (): void => {
		setIsPopupOpen(false);
	};

	const onPageNameChangedHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setNewPageName(event.target.value);
	};

  const onSaveNewPageHandler = (): void => {
    setIsPopupOpen(false);
    onClosePopupCallback(newPageName);
  }

	return {
		isPopupOpen,
		newPageName,
		onClosePagePopupHandler,
		onPageNameChangedHandler,
    onSaveNewPageHandler
	};
};

export { usePagePopup };
