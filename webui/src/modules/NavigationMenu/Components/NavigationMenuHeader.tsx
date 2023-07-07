import * as React from 'react'
import {Divider, List, ListItem, ListItemIcon, Typography} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FaceIcon from '@mui/icons-material/Face'

const NavigationMenuHeader = () => {
  return (
    <List>
      <ListItem sx={{minWidth: '0'}}><ListItemIcon><FaceIcon/></ListItemIcon><Typography variant="body1">Alin's Notion</Typography></ListItem>
      <ListItem><ListItemIcon><AddCircleOutlineIcon/></ListItemIcon><Typography variant="body1">New project</Typography></ListItem>
    </List>
  )
}
export default NavigationMenuHeader