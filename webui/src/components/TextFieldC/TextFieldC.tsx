import { Box, InputLabel, TextField, type Theme, Typography } from '@mui/material';
import type { TextFieldCProps } from './types';

const TextFieldC: React.FC<TextFieldCProps> = ({ name, id, value, hasError, label, onChange, placeholder = undefined, onKeyPress }) => {
	return (
		<Box id={`wrapper_${id}`}>
			<InputLabel htmlFor={id}>
				<Typography variant={'smallRegular'}>{label}</Typography>
			</InputLabel>
			<TextField
				id={id}
				name={name}
        variant='outlined'
				placeholder={placeholder}
				InputLabelProps={{
					shrink: false
				}}
				sx={(theme: Theme) => ({
					width: '100%',
					mt: '0.25rem',
					'& .MuiInputBase-input': {
            background: '#F8F8F8',
            borderRadius: '0.25rem',
						padding: '1.5rem 1rem',
					},
          '& fieldset': {
            borderColor: `${theme.palette.blue[80]} !important`
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