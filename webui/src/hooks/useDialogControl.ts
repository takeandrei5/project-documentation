import { useState } from 'react';
import { DialogControlProps } from '../utils/types';

const useDialogControl = ():DialogControlProps => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openHandler = ():void => {
		setIsOpen(true);
	};

	const closeHandler = ():void => {
		setIsOpen(false);
	};

	return { isOpen, openHandler, closeHandler };
};

export default useDialogControl;