import type { RenamePagePopupProps } from './types';
import { InputPopup } from '../../views';
import { usePagePopup } from './hooks';
import { Box } from '@mui/material';

const PagePopup: React.FC<RenamePagePopupProps> = ({ initialPageName, onClosePopupCallback }) => {
	const { isPopupOpen, newPageName, onClosePagePopupHandler, onPageNameChangedHandler, onSaveNewPageHandler } = usePagePopup(initialPageName, onClosePopupCallback);

	return (
		<>
			{isPopupOpen && (
				<Box sx={{ zIndex: 1001 }}>
					<InputPopup value={newPageName} onClosePopperHandler={onClosePagePopupHandler} onChangeHandler={onPageNameChangedHandler} onSaveHandler={onSaveNewPageHandler} />
				</Box>
			)}
		</>
	);
};

export default PagePopup;
