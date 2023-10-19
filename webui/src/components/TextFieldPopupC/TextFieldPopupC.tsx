import * as MUIIcons from '@mui/icons-material';
import { ClickAwayListener, Paper, Popover, TextField, type Theme } from '@mui/material';
import { ButtonC, IconPickerC } from '..';
import { useTextFieldPopup } from './hooks';
import type { TextFieldPopupCProps } from './types';

const TextFieldPopupC: React.FC<TextFieldPopupCProps> = ({
	anchorEl,
	initialIconValue,
	initialTextFieldValue,
	onClosePopupCallback,
	anchorOrigin = {
		vertical: 'top',
		horizontal: 'left'
	},
	anchorPosition = undefined
}) => {
	const { iconValue, onIconValueChangedHandler, onKeyDownHandler, onSaveNewValuesHandler, onTextFieldValueChangedHandler, textFieldValue } = useTextFieldPopup(
		initialTextFieldValue,
		initialIconValue,
		onClosePopupCallback
	);

	return (
		<ClickAwayListener onClickAway={onSaveNewValuesHandler}>
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
					<IconPickerC initialIcon={MUIIcons[iconValue]} onIconSelectedHandler={onIconValueChangedHandler} />
					<TextField
						onKeyDown={onKeyDownHandler}
						variant='outlined'
						sx={(theme: Theme) => ({
							'& .MuiOutlinedInput-root': { height: '2.0625rem !important', lineHeight: '2.0625rem !important' },
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
					<ButtonC onClick={onSaveNewValuesHandler} size='small' variant='primary' type='button'>
						Save
					</ButtonC>
				</Paper>
			</Popover>
		</ClickAwayListener>
	);
};

export default TextFieldPopupC;
