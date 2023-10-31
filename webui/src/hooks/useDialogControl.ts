import { useState } from 'react';

const useDialogControl = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openHandler = (): void => {
		setIsOpen(true);
	};

	const closeHandler = (): void => {
		setIsOpen(false);
	};

	return { isOpen, openHandler, closeHandler };
};

export { useDialogControl };
