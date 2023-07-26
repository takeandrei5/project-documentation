import {MultiBackend, Tree, getBackendOptions} from '@minoru/react-dnd-treeview'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import {Box, Divider, Icon, ListItem, ListItemIcon, Typography} from '@mui/material'
import {FC, useEffect} from 'react'
import {DndProvider} from 'react-dnd'
import VerticalMenu from './VerticalMenu'
import {TreeDataProps} from '../types'
import AddNewFileComponent from './AddNewFileComponent'

const NavigationMenuBody:FC<TreeDataProps> = ({treeData, setTreeData}:TreeDataProps) => {
  const handleDrop = (newTreeData) => setTreeData(newTreeData)

  return (
    <Box
      sx={{
        '& .Root': {ml: 0, pl: '1rem', mt: '0.75rem', mb: '1rem'},
        '& .Root .Container': {ml: '1rem', pl: '1rem'},
        '& ul': {ml: '1rem'},
        '& li': {listStyleType: 'none'}
      }}
    >
      <Divider/>
      <ListItem>
        <ListItemIcon>
          <FolderOpenIcon/>
        </ListItemIcon>
        <Typography>Shared</Typography>
      </ListItem>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          dragPreviewRender={(monitorProps) => {
            const item = monitorProps.item
            return <Typography sx={{fontSize: '0.75rem', fontWeight: 'bold', pl: '1rem', color: 'black', opacity: 0.7}}>{item.text}</Typography>
          }}
          rootId={0}
          classes={{
            root: 'Root',
            listItem: 'ListItem',
            container: 'Container'
          }}
          id={'tree-view-id'}
          onDrop={handleDrop}
          canDrop={(_, {dragSource, dropTargetId}) => {
            if (dragSource?.parent === dropTargetId) return true
          }}
          sort={false}
          insertDroppableFirst={true}
          render={(node, {depth, isOpen, onToggle}) => {
            console.log('node', node)
            return <>
              <Box component={'span'} sx={{ml: depth * 0.1, p: '0.25rem 0.75rem 0 0', display: 'flex'}}>
                <Box onClick={onToggle} sx={{
                  display: 'flex', alignItems: 'center', width: '100%', cursor: 'pointer', '&:hover p': {
                    fontWeight: 'bold'
                  }
                }}
                >

                  {node.droppable && (
                    <ListItemIcon sx={{minWidth: '0.5rem', cursor: 'pointer'}}>
                      {isOpen ? <Icon>expand_more</Icon> : <Icon>chevron_right</Icon>}
                    </ListItemIcon>
                  )}
                  <ListItemIcon sx={{minWidth: 0, mr: '0.25rem'}}><Icon>{node.iconName}</Icon></ListItemIcon>
                  <Typography sx={{display: 'flex', alignItems: 'center'}}>
                    {node.text}
                  </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', flex: 1}}>
                  {node.droppable && <AddNewFileComponent parentId={node.parentId}  setTreeData={setTreeData} nodeId={node.id} treeData={treeData}/>}
                  <VerticalMenu link={node.link}
                                nodeId={node.id}
                                text={node.text}
                                treeData={treeData}
                                setTreeData={setTreeData}
                  />
                </Box>
              </Box>
            </>
          }}
        />
      </DndProvider>
    </Box>
  )
}
export default NavigationMenuBody
