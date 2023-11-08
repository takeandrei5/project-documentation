import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import type {DropdownFieldProps, DropdownOption} from './types.ts'
import type {Theme} from '@mui/material'
import {Typography} from '@mui/material'

const DropdownFieldC:React.FC<DropdownFieldProps> = ({id, label, name, options, onChange, value}:DropdownFieldProps) => {
  return (
    <Box>
      <InputLabel htmlFor={id}>
        <Typography variant={'smallRegular'}>{label}</Typography>
      </InputLabel>
      <Select
        sx={(theme:Theme) => ({
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
        onChange={onChange}
      >
        {options.map((option:DropdownOption) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </Box>
  )
}
export default DropdownFieldC