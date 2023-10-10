import { useState } from 'react';

const useTextFieldPopup = (initialTextFieldValue: string, onClosePopupCallback: (textFieldValue: string) => void) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [textFieldValue, setTextFieldValue] = useState<string>(initialTextFieldValue);

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === 'Enter') {
			onSaveNewTextFieldValueHandler();
		}
	};

	const onSaveNewTextFieldValueHandler = (): void => {
		onClosePopupCallback(textFieldValue);
	};

	const onTextFieldValueChangedHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setTextFieldValue(event.target.value);
	};

	return {
    anchorEl,
    onKeyDownHandler,
		onSaveNewTextFieldValueHandler,
		onTextFieldValueChangedHandler,
		textFieldValue
	};
};

export { useTextFieldPopup };
