import { Box, ClickAwayListener, Icon, Paper, TextField } from '@mui/material';
import type { TextInputPopupProps } from './types';

const TextInputPopup:React.FC<TextInputPopupProps> = ({ onChangeHandler, onClosePopperHandler, onSaveHandler, value }) => {
	const onKeyDownHandler = (e:React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			onSaveHandler();
		}
	};

	return (
		<ClickAwayListener onClickAway={onClosePopperHandler}>
			<Paper
				elevation={3}
				component={'span'}
				sx={{
					background: '#FFFFFF',
					p: '0.25rem',
					display: 'flex',
					border: '1px solid lightgrey',
					borderRadius: '0.25rem',
					alignItems: 'center',
					height: '2rem',
					columnGap: '0.25rem'
				}}
			>
				<TextField
					onKeyDown={onKeyDownHandler}
					sx={{ '& .MuiOutlinedInput-root': { height: '2rem' }, background: '#F8F8F8', height: '2rem', width: '20rem' }}
					type={'text'}
					value={value}
					onChange={onChangeHandler}
				/>
				<Box
					component={'span'}
					sx={{
						display: 'flex',
						background: '#F5F5F5',
						height: '94%',
						borderRadius: '0.25rem',
						border: '1px solid lightgrey',
						alignItems: 'center'
					}}
				>
					<Icon sx={{ cursor: 'pointer' }} onClick={onSaveHandler}>
						save_outlined_icon
					</Icon>
				</Box>
			</Paper>
		</ClickAwayListener>
	);
};

export default TextInputPopup;
