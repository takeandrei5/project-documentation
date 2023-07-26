import {Dispatch, FC, useState} from 'react'
import RenameFileComponent from './RenameFileComponent'
import * as React from 'react'
import {TreeDataValues} from '../types'
import {Box, ClickAwayListener, Icon, Paper} from '@mui/material'
import {v4 as uuidv4} from 'uuid'

type NewFileProps = {
  setTreeData:Dispatch<React.SetStateAction<TreeDataValues[]>>
  nodeId:number | string
  treeData:TreeDataValues[]
  parentId:number
}
const AddNewFileComponent:FC<NewFileProps> = ({setTreeData, nodeId, treeData, parentId}) => {
  const [newFile, setNewFile] = useState<string>('')

  const [newFileIsOpen, setNewFileIsOpen] = useState<boolean>(false)

  const addFileHandler = (ev):void => {
    setNewFile(ev.target.value)
  }

  const openPopperHandler = ():void => {
    setNewFileIsOpen(!newFileIsOpen)
  }

  const closePopperHandler = ():void => {
    setNewFileIsOpen(false)
  }

  const addNewFileHandler = ():void => {
    console.log(treeData)
    console.log({parentId})
    console.log({nodeId})
    const newTreeData = {
      parent: nodeId as number,
      id: uuidv4(),
      text: newFile,
      iconName: 'text_snippet_outlined',
      link: `/project-description/2/${newFile}`,
    }
    const newTreeDataArr = [...treeData, newTreeData]
    setTreeData(newTreeDataArr)
    closePopperHandler()
  }

  return (
    <Box sx={{position: 'relative'}}>
      <Icon onClick={openPopperHandler}>add</Icon>
      <Box sx={{position: 'absolute', top: 0, left: 0, zIndex: 1000}}>
        {newFileIsOpen &&
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
              <RenameFileComponent onEnter={addNewFileHandler}
                                   value={newFile}
                                   onChange={addFileHandler}
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
                <Icon sx={{cursor: 'pointer'}} onClick={addNewFileHandler}>save_outlined_icon</Icon>
              </Box>
            </Paper>
          </ClickAwayListener>
        }
      </Box>
    </Box>
  )
}
export default AddNewFileComponent