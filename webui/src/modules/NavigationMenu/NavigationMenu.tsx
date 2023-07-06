import * as React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import {Box, Divider, List, ListItem, ListItemIcon, Typography} from '@mui/material'
import {FC, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FaceIcon from '@mui/icons-material/Face'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const data = {
  id: 'root',
  name: 'AI Story Builder',
  //  icon: TextSnippetOutlinedIcon,
  children: [
    {
      id: 'project-1',
      name: 'Product Management',
    },
    {
      id: 'project-2',
      name: 'Development',
    },
    {
      id: 'project-3',
      name: 'Design',
      children: [
        {
          id: 'project-4',
          name: 'Design System',
        },
      ],
    },
    {
      id: 'project-5',
      name: 'Reusable Components',
      children: [
        {
          id: 'project-6',
          name: 'Google Sign In',
        },
        {
          id: 'project-7',
          name: 'Facebook Sign In',
        },
      ],
    },
  ],
}
const arr = [
  {id: 'item-1', name: 'Create a teamspace'},
  {id: 'item-2', name: 'Templates'},
  {id: 'item-3', name: 'Import'},
  {id: 'item-4', name: 'Trash'}
]

const NavMenu:FC = ({}) => {

  const [orderListMenu, setOrderListMenu] = useState<any[]>(arr)

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  )
  console.log({orderListMenu})
  function handleOnDragEnd(result) {
    const items = Array.from(orderListMenu)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setOrderListMenu(items)
  }

  return (
    <Box>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              <ListItem sx={{minWidth: '0'}}><ListItemIcon><FaceIcon/></ListItemIcon><Typography sx={{ml: '0.5rem'}}>Alin's Notion</Typography></ListItem>
              <ListItem><ListItemIcon><AddCircleOutlineIcon/></ListItemIcon><Typography>New project</Typography></ListItem>
              <Divider/>
              <ListItem><ListItemIcon><FolderOpenIcon/></ListItemIcon><Typography>Shared</Typography></ListItem>
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                sx={{height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
              >
                {renderTree(data)}
              </TreeView>
              <Divider/>

              {orderListMenu.map((item, index) => {
                return <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <ListItem key={item.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ListItemIcon>
                        <TextSnippetOutlinedIcon/>
                      </ListItemIcon>
                      <Typography>{item.name}</Typography>
                    </ListItem>
                  )}
                </Draggable>
              })}
              {provided.placeholder}
              {/*<ListItem><ListItemIcon><PeopleAltOutlinedIcon/></ListItemIcon><Typography>Create a teamspace</Typography></ListItem>*/}
              {/*<ListItem><ListItemIcon><WidgetsOutlinedIcon/></ListItemIcon><Typography>Templates</Typography></ListItem>*/}
              {/*<ListItem><ListItemIcon><DownloadOutlinedIcon/></ListItemIcon><Typography>Import</Typography></ListItem>*/}
              {/*<ListItem><ListItemIcon><DeleteOutlineOutlinedIcon/></ListItemIcon><Typography>Trash</Typography></ListItem>*/}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>

  )
}

export default NavMenu