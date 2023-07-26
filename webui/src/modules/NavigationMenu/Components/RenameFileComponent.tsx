import {Box, TextField} from '@mui/material'
import {ChangeEvent, KeyboardEvent, FC} from 'react'

type RenameFileComponentProps = {
  value:string
  onChange:(event:ChangeEvent<HTMLInputElement>) => void
  onEnter:(event:KeyboardEvent<HTMLInputElement>) => void
}
const RenameFileComponent:FC<RenameFileComponentProps> = ({value, onChange, onEnter}) => {
  return (
    <TextField onKeyDown={(ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault()
        onEnter(ev)
      }
    }} sx={{'& .MuiOutlinedInput-root': {height: '2rem'}, background: '#F8F8F8', height: '2rem', width: '20rem'}} type={'text'} value={value} onChange={onChange}
    />

  )
}
export default RenameFileComponent