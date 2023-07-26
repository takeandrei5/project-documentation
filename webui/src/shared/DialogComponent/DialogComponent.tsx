import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ClearIcon from '@mui/icons-material/Clear'
import {Box, Button} from '@mui/material'
import {DialogControlProps} from './types'

interface DialogProps {
  title:string
  description?:string
  content:JSX.Element
  onSubmit:() => void
  control:DialogControlProps
  cancelButtonLabel?:string
  submitButtonLabel?:string
}

function DialogComponent({title, onSubmit, description, content, control, cancelButtonLabel = 'Cancel', submitButtonLabel = 'Submit'}:DialogProps) {
  const {isOpen, closeHandler} = control

  const submitHandler = ():void => {
    onSubmit()
    closeHandler()
  }

  return (
    <Box>
      <Dialog open={isOpen} onClose={closeHandler}>
        <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>{title}
          <ClearIcon sx={{cursor: 'pointer'}} onClick={closeHandler}/>
        </DialogTitle>
        <DialogContent>
          {description && <DialogContentText>{description}</DialogContentText>}
          {content}
        </DialogContent>
        <DialogActions sx={{p: '0.5rem 1.5rem 1rem 1.5rem'}}>
          <Button variant={'outlined'} size={'small'} onClick={closeHandler}>{cancelButtonLabel}</Button>
          <Button size={'small'} onClick={submitHandler}>{submitButtonLabel}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DialogComponent