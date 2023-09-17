import { Box, InputLabel, TextField, Typography } from '@mui/material';
import { TextFieldCProps } from './types';
import { FC } from 'react';

const TextFieldC:FC<TextFieldCProps> = ({ name, id, value, hasError, label, onChange, placeholder = undefined, onKeyPress }) => {
	return (
		<Box id={`wrapper_${id}`}>
			<InputLabel htmlFor={id}><Typography variant={'smallRegular'}>{label}</Typography></InputLabel>
			<TextField
				id={id}
				name={name}
				shrink={false}
				placeholder={placeholder}
				sx={(theme) => ({
					width: '100%',
					mt: '0.25rem',
					background: theme.palette.blue[10],
					'& input': {
						padding: '1.5rem 1rem'
					}
				})}
				onKeyPress={onKeyPress}
				onChange={onChange}
				value={value}
				error={hasError}
			/>
		</Box>
	);
};
export default TextFieldC;