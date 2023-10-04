import { ClickAwayListener, Paper, TextField, type Theme } from '@mui/material';
import { ButtonC } from '../../../../components';
import type { TextInputPopupProps } from './types';

const InputPopup: React.FC<TextInputPopupProps> = ({ onChangeHandler, onClosePopperHandler, onSaveHandler, value }) => {
	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === 'Enter') {
			onSaveHandler();
		}
	};

	return (
		<ClickAwayListener onClickAway={onClosePopperHandler}>
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
					'& .MuiFormControl-root': {
						borderRadius: '0.25rem'
					}
				})}>
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
					type={'text'}
					value={value}
					onChange={onChangeHandler}
				/>
				<ButtonC onClick={onSaveHandler} size='small' variant='primary' type='button'>
					Save
				</ButtonC>
			</Paper>
		</ClickAwayListener>
	);
};

export default InputPopup;
