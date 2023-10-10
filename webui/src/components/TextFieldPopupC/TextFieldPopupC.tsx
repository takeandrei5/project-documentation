import { Box, ClickAwayListener, Paper, Popover, TextField, type Theme } from '@mui/material';
import { ButtonC, IconPickerC } from '..';
import { useTextFieldPopup } from './hooks';
import type { TextFieldPopupCProps } from './types';

const TextFieldPopupC: React.FC<TextFieldPopupCProps> = ({
	anchorEl,
	initialTextFieldValue,
	onClosePopupCallback,
	anchorOrigin = {
		vertical: 'top',
		horizontal: 'left'
	},
	anchorPosition = undefined
}) => {
	const { onKeyDownHandler, onSaveNewTextFieldValueHandler, onTextFieldValueChangedHandler, textFieldValue } = useTextFieldPopup(initialTextFieldValue, onClosePopupCallback);

	return (
		<>
			<ClickAwayListener onClickAway={onSaveNewTextFieldValueHandler}>
				<Popover id='popover' open anchorEl={anchorEl} anchorOrigin={anchorOrigin} anchorPosition={anchorPosition}>
					<Paper
						elevation={4}
						component={'span'}
						sx={(theme: Theme) => ({
							background: theme.palette.background.default,
							padding: '0.25rem 0.5rem',
							display: 'flex',
							borderRadius: '0.25rem',
							alignItems: 'center',
							columnGap: '0.25rem',
							zIndex: 1001,
							'& .MuiFormControl-root': {
								borderRadius: '0.25rem'
							}
						})}>
						<IconPickerC onClick={console.log} />
						<TextField
							onKeyDown={onKeyDownHandler}
							variant='outlined'
							sx={(theme: Theme) => ({
								'& .MuiOutlinedInput-root': { height: '1.75rem !important', lineHeight: '1.75rem !important' },
								'& input': {
									color: theme.palette.textColor[100]
								},
								background: '#F8F8F8',
								width: '20rem'
							})}
							placeholder='Enter new name'
							InputProps={{
								sx: (theme: Theme) => ({
									lineHeight: '1rem !important',
									height: '1rem !important',
									'& fieldset': {
										borderColor: `${theme.palette.cyan[20]} !important`
									}
								})
							}}
							onChange={onTextFieldValueChangedHandler}
							type={'text'}
							value={textFieldValue}
						/>
						<ButtonC onClick={onSaveNewTextFieldValueHandler} size='small' variant='primary' type='button'>
							Save
						</ButtonC>
					</Paper>
				</Popover>
			</ClickAwayListener>
		</>
	);
};

export default TextFieldPopupC;
