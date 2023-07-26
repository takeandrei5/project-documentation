import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FaceIcon from '@mui/icons-material/Face'
import {Button, List, ListItem, ListItemIcon, Modal, Paper, TextField, Typography} from '@mui/material'
import {ChangeEvent, FC, useState} from 'react'
import {TreeDataProps, TreeDataValues} from '../types'
import {v4 as uuidv4} from 'uuid'

const NavigationMenuHeader:FC<TreeDataProps> = ({setTreeData, treeData}:TreeDataProps) => {
  const [projectName, setProjectName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen<boolean>(true)
  const handleClose = () => setOpen<boolean>(false)

  const addNewProjectHandler = ():void => {
    const newTreeData:TreeDataValues = {
      parent: 0,
      id: uuidv4(),
      text: projectName,
      droppable: true,
      iconName: 'folder_open',
      link: '/project-description/2',
    }
    setTreeData([...treeData, newTreeData])
    handleClose()
    setProjectName('')
  }

  return (
    <>
      <List>
        <ListItem sx={{minWidth: '0'}}>
          <ListItemIcon>
            <FaceIcon/>
          </ListItemIcon>
          <Typography variant="body1">Alin's Notion</Typography>
        </ListItem>
        <ListItem onClick={handleOpen} sx={{'&:hover p': {fontWeight: 'bold'}, cursor: 'pointer'}}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon/>
          </ListItemIcon>
          <Typography variant="body1">New project</Typography>
        </ListItem>
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '0.75rem',
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 250,
          bgcolor: 'background.paper',
          boxShadow: 5,
          p: 4,
          outline: 0,
        }}
        >
          <Typography variant="h6" component="h1" fontWeight={600}>
            Enter project name
          </Typography>
          <TextField
            placeholder="Type your project name"
            variant="outlined"
            size="small"
            InputProps={{
              sx: {
                borderRadius: '0.75rem',
                border: '1px solid #000000',
                outline: 0,
                width: '12rem',
                '& > fieldset': {
                  border: 'none'
                }
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addNewProjectHandler()
              }
            }}
            onChange={(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setProjectName(e.target.value)}
            value={projectName}
          />
          <Button
            variant="contained"
            onClick={addNewProjectHandler}
            sx={{
              borderRadius: '0.5rem',
              boxShadow: 0,
              backgroundColor: '#8FD14F',
              color: '#000000',
              mt: '1rem',
              ':hover': {
                backgroundColor: '#8FD14F'
              }
            }}
          >
            Create project
          </Button>
        </Paper>
      </Modal>
    </>

  )
}
export default NavigationMenuHeader
