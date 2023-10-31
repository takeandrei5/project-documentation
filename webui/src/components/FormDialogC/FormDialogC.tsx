import type {FormDialogCProps} from './types.ts'
import type {FormEvent} from 'react'
import {useEffect, useRef} from 'react'
import {Box, Dialog, Typography} from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import {ButtonC} from '../ButtonC'

const FormDialogC:React.FC<FormDialogCProps> = ({control, title, content, description, onSubmitHandler, submitCallback}:FormDialogCProps) => {
  const {isOpen, closeHandler, openHandler} = control

  const ref = useRef({callback: ''})
  useEffect(() => {
    window.addEventListener('message', (event) => {
      const data = event.data
      if (data.message !== 'OPEN_COMPONENT_MODAL') {
        return
      }
      ref.current.callback = data.callback
      eval(ref.current.callback)()
      openHandler()
    })
    return () => {
      window.removeEventListener('message', () => {return})
    }
  }, [])

  const cancelHandler = () => {
    closeHandler()
    window.removeEventListener('message', () => {return})
    ref.current.callback = ''
  }
  const createHandler = (ev:FormEvent<HTMLElement>) => {
    onSubmitHandler(ev)
    if (submitCallback) submitCallback()
    window.removeEventListener('message', () => {return})
    ref.current.callback = ''

  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant={'largeBold'} sx={(theme) => ({color: theme.palette.textColor[100]})}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        <Box component={'form'}>
          {content}
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonC size={'small'} variant={'primary'} onClick={cancelHandler}>Cancel</ButtonC>
        <ButtonC size={'small'} variant={'secondary'} onClick={createHandler}>Create</ButtonC>
      </DialogActions>
    </Dialog>
  )
}
export default FormDialogC