import * as React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import {Avatar, Box, Divider, List, ListItem, ListItemIcon, MenuItem, Typography} from '@mui/material'
import {FC} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FaceIcon from '@mui/icons-material/Face';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const data = {
  id: 'root',
  name: 'AI Story Builder',
  icon:TextSnippetOutlinedIcon,
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
          id: 'project-6',
          name: 'Facebook Sign In',
        },
      ],
    },
  ],
}

const NavMenu:FC = ({}) => {
  function stringAvatar(name:string) {
    return {
      sx: {
        bgcolor: 'red',
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  )
  return (
    <Box>
      <List>
        <ListItem sx={{minWidth:'0'}}><ListItemIcon><FaceIcon/></ListItemIcon><Typography sx={{ml: '0.5rem'}}>Alin's Notion</Typography></ListItem>
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
        <ListItem><ListItemIcon><PeopleAltOutlinedIcon/></ListItemIcon><Typography>Create a teamspace</Typography></ListItem>
        <ListItem><ListItemIcon><WidgetsOutlinedIcon/></ListItemIcon><Typography>Templates</Typography></ListItem>
        <ListItem><ListItemIcon><DownloadOutlinedIcon/></ListItemIcon><Typography>Import</Typography></ListItem>
        <ListItem><ListItemIcon><DeleteOutlineOutlinedIcon/></ListItemIcon><Typography>Trash</Typography></ListItem>
      </List>
    </Box>

  )
}

export default NavMenu