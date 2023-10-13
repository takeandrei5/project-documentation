import { useCallback, useState } from 'react';
import type { MUIIconKeys } from '../../utils/types';

const useTextFieldPopup = (initialTextFieldValue: string, initialIconValue: MUIIconKeys, onClosePopupCallback: (textFieldValue: string, iconName: MUIIconKeys) => void) => {
	const [textFieldValue, setTextFieldValue] = useState<string>(initialTextFieldValue);
	const [iconValue, setIconValue] = useState<MUIIconKeys>(initialIconValue);

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === 'Enter') {
			onSaveNewValuesHandler();
		}
	};

	const onSaveNewValuesHandler = (): void => {
		onClosePopupCallback(textFieldValue, iconValue);
	};

	const onTextFieldValueChangedHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setTextFieldValue(event.target.value);
	};

	const onIconValueChangedHandler = useCallback((icon: MUIIconKeys) => {
		setIconValue(icon);
	}, []);

	return {
		iconValue,
		onIconValueChangedHandler,
		onKeyDownHandler,
		onSaveNewValuesHandler,
		onTextFieldValueChangedHandler,
		textFieldValue
	};
};

export { useTextFieldPopup };
