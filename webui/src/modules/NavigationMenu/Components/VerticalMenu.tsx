import * as React from 'react'
import {Dispatch, FC, useState} from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import {Box, ClickAwayListener, Icon, ListItemButton, Snackbar} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu'
import RenameFileComponent from './RenameFileComponent'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'
import {v4 as uuidv4} from 'uuid'
import {TreeDataValues} from '../types'

type MenuProps = {
  setTreeData:Dispatch<React.SetStateAction<TreeDataValues[]>>
  nodeId:number
  text:string
  treeData:TreeDataValues[]
  link:string
}
const icons = {
  content_cut: 'content_cut',
  content_copy: 'content_copy',
  content_paste: 'content_paste',
  drive_file_rename_outline: 'drive_file_rename_outline',
  cloud: 'cloud'
}
const VerticalMenu:FC<MenuProps> = ({nodeId, setTreeData, text, treeData, link}) => {
  const menuId:string = 'basic-menu'
  const buttonId:string = 'basic-button'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const {copyToClipboard} = useCopyToClipboard()
  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuIsOpen(!menuIsOpen)
  }
  const handleClose = ():void => {
    setAnchorEl(null)
    setMenuIsOpen(false)
  }
  //open state
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [renameIsOpen, setRenameIsOpen] = useState<boolean>(false)

  //value state
  const [renameFile, setRenameFile] = useState<string>(text)
  const [deleteFile, setDeleteFile] = useState<string>('')

  const renameFileHandler = (ev):void => {
    setRenameFile(ev.target.value)
  }
  const addNewProjectHandler = () => {
    const newTreeData = {
      parent: 0,
      id: 99,
      text: 'new project',
      droppable: true,
      iconName: 'folder_open',
      link: '/project-description/2',
    }
    const newTreeDataArr = [...treeData, newTreeData]
    setTreeData(newTreeDataArr)
    handleClose()
  }
  const openRenameFileHandler = ():void => {
    setRenameIsOpen(!renameIsOpen)
    handleClose()
  }

  const closePopperHandler = ():void => {
    setRenameIsOpen(false)
    handleClose()
  }

  const submitRenameHandler = ():void => {
    const findNode = treeData.find((node) => node.id === nodeId)
    if (findNode) {
      findNode.text = renameFile
      const newTreeData = [...treeData]
      setTreeData(newTreeData)
      //send newTreeData to server
    }
    closePopperHandler()
  }

  const snackbarCloseHandler = (ev, reason):void => {
    if (reason === 'escapeKeyDown' || reason === 'clickaway') {
      setSnackbarOpen(false)
    }
  }

  const copyLinkHandler = async (link:string):Promise<void> => {
    const response = await copyToClipboard(link)
    if (response) {
      setSnackbarOpen(true)
    }
    handleClose()
  }

  const deleteItem = (data):TreeDataValues[] => {
    const filteredData = data.filter((item) => item.id !== nodeId)
    return filteredData.filter((item) => {
      item.droppable = treeData.some((child) => child.parent === item.id);
      return true // Keep root items or items without remaining children
    })
  }

  const handleDelete = () => {
    const updatedData = deleteItem([...treeData])
    setTreeData(updatedData)
  }

  const duplicateNode = (nodeId, parentId = null) => {
    const selectedNode = treeData.find((item) => item.id === nodeId) //PROJECT MANAGEMENT node
    const newSelectedNodeId = uuidv4()
    const newSelectedNode = {...selectedNode, id: newSelectedNodeId, parent: parentId || selectedNode.parent, text: `${selectedNode.text} (copy)`}
    let newNodes = [newSelectedNode]
    treeData.filter((item) => item.parent === selectedNode.id).forEach((item) => {
      newNodes = [...newNodes, ...duplicateNode(item.id, newSelectedNodeId)]
    })
    return newNodes
  }
  const duplicateNodeHandler = ():void => {
    const arr = duplicateNode(nodeId)
    setTreeData([...treeData, ...arr])

  }

  return (
    <Box sx={{position: 'relative'}}>
      <ListItemButton id={buttonId}
                      aria-controls={menuIsOpen ? menuId : undefined}
                      aria-haspopup="true"
                      aria-expanded={menuIsOpen ? 'true' : undefined}
                      onClick={handleClick}
                      sx={{p: '0.4rem'}}
      >
        <MoreHorizIcon/>
      </ListItemButton>
      <Box sx={{position: 'absolute', top: 0, left: 0, zIndex: 1000}}>
        {renameIsOpen &&
          <ClickAwayListener onClickAway={closePopperHandler}>
            <Paper elevation={3} component={'span'}
                   sx={{
                     background: '#FFFFFF',
                     p: '0.25rem',
                     display: 'flex',
                     border: '1px solid lightgrey',
                     borderRadius: '0.25rem',
                     alignItems: 'center',
                     height: '2rem',
                     columnGap: '0.25rem'
                   }}
            >
              <RenameFileComponent onEnter={submitRenameHandler}
                                   value={renameFile}
                                   onChange={renameFileHandler}
              />
              <Box component={'span'}
                   sx={{
                     display: 'flex',
                     background: '#F5F5F5',
                     height: '94%',
                     borderRadius: '0.25rem',
                     border: '1px solid lightgrey',
                     alignItems: 'center'
                   }}
              >
                <Icon sx={{cursor: 'pointer'}} onClick={submitRenameHandler}>save_outlined_icon</Icon>
              </Box>
            </Paper>
          </ClickAwayListener>
        }
      </Box>
      <Menu anchorEl={anchorEl}
            id={menuId}
            open={menuIsOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': buttonId,
            }}
            sx={{'& .MuiPaper-root': {width: 300}}}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Icon>{icons.content_cut}</Icon>
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => copyLinkHandler(link)}>
          <ListItemIcon>
            <Icon>{icons.content_copy}</Icon>
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        {/*<MenuItem onClick={handleDuplicate}>*/}
        <MenuItem onClick={duplicateNodeHandler}>
          <ListItemIcon>
            <Icon>{icons.content_paste}</Icon>
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem>
        <MenuItem onClick={openRenameFileHandler}>
          <ListItemIcon>
            <Icon>{icons.drive_file_rename_outline}</Icon>
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={addNewProjectHandler}>
          <ListItemIcon>
            <Icon>{icons.cloud}</Icon>
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </Menu>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={snackbarOpen}
        onClose={snackbarCloseHandler}
        message="Link copied to clipboard!"
        key={'bottom-center'}
      />
    </Box>
  )
}
export default VerticalMenu

