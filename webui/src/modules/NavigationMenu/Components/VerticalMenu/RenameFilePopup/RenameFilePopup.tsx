import { TextInputPopup } from '../TextInputPopup';
import { type RenameFilePopupProps } from './types';

const RenameFilePopup:React.FC<RenameFilePopupProps> = ({ value, onChangeHandler, onSaveHandler, onClosePopperHandler }) => {
	console.log('RenameFilePopup', value);
	return <TextInputPopup value={value} onChangeHandler={onChangeHandler} onClosePopperHandler={onClosePopperHandler} onSaveHandler={onSaveHandler} />;
};

export default RenameFilePopup;
