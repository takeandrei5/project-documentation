import Box from '@mui/material/Box';
import type { CheckboxFieldProps } from './types.ts';
import type { Theme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CheckboxFieldC: React.FC<CheckboxFieldProps> = ({ id, label, disabled = false, name, onChange, value }: CheckboxFieldProps) => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					sx={(theme: Theme) => ({
						width: 'fit-content',
						mt: '0.25rem',
						'& .MuiInputBase-input': {
							background: '#F8F8F8',
							borderRadius: '0.25rem',
							padding: '0.785rem 1rem'
						},
						'& fieldset': {
							borderColor: `${theme.palette.blue[80]} !important`
						}
					})}
					disabled={disabled}
					id={id}
					name={name}
					value={value}
					onChange={onChange}
				/>
			}
			label={<Box sx={{ whiteSpace: 'nowrap' }}>{label}</Box>}
		/>
	);
};
export default CheckboxFieldC;
