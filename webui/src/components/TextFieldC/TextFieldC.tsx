import { Box, InputLabel, TextField, type Theme, Typography } from '@mui/material';
import type { TextFieldCProps } from './types';

const TextFieldC: React.FC<TextFieldCProps> = ({
	label,
	id,
	value,
	disabled = false,
	errorMessage = undefined,
	hasError = false,
	multiline = false,
	name = undefined,
	onChange = () => {
		return;
	},
	onKeyPress = () => {
		return;
	},
	placeholder = undefined
}) => {
	return (
		<Box id={`wrapper_${id}`}>
			<InputLabel htmlFor={id}>
				<Typography variant={'smallRegular'}>{label}</Typography>
			</InputLabel>
			<TextField
				id={id}
				name={name}
				variant='outlined'
				disabled={disabled}
				multiline={multiline}
				minRows={5}
				placeholder={placeholder}
				InputProps={{
					sx: {
						padding: 0
					}
				}}
				InputLabelProps={{
					shrink: false
				}}
				sx={(theme: Theme) => ({
					width: '100%',
					//          height: '3rem',
					mt: '0.25rem',
					'& .MuiInputBase-input': {
						background: '#F8F8F8',
						borderRadius: '0.25rem',
						padding: '1.25rem 0.75rem'
					},
					'& fieldset': {
						borderColor: `${theme.palette.blue[80]} !important`
					}
				})}
				onKeyPress={onKeyPress}
				onChange={onChange}
				value={value}
			/>
			{hasError && (
				<Typography
					id={`${id}_error`}
					variant='extraSmallRegular'
					sx={(theme: Theme) => ({
						mt: '0.25rem',
						color: theme.palette.red[60]
					})}>
					{errorMessage}
				</Typography>
			)}
		</Box>
	);
};
export default TextFieldC;
