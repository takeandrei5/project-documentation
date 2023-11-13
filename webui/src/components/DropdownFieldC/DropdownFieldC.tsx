import type { SelectChangeEvent, Theme } from '@mui/material';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { DropdownFieldProps, DropdownOption } from './types.ts';

const DropdownFieldC: React.FC<DropdownFieldProps> = ({ id, label, name, options, onChange, value, disabled = false }) => {
	return (
		<>
			<InputLabel htmlFor={id}>
				<Typography variant={'smallRegular'}>{label}</Typography>
			</InputLabel>
			<Select
				disabled={disabled}
				sx={(theme: Theme) => ({
					width: '100%',
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
				fullWidth
				id={id}
				name={name}
				value={value}
				onChange={(e: SelectChangeEvent<string>) => onChange(e.target.value)}>
				{options.map((option: DropdownOption) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
			{value && !disabled && (
				<Typography variant='extraSmallMedium' onClick={() => onChange('')} sx={(theme: Theme) => ({ cursor: 'pointer', color: theme.palette.blue[80] })}>
					Clear
				</Typography>
			)}
		</>
	);
};
export default DropdownFieldC;
