import * as React from 'react'
import {List, ListItem, ListItemIcon, Typography} from '@mui/material'

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const NavigationMenuHeader = () => {
  return (
    <List>
      <ListItem><ListItemIcon><PeopleAltOutlinedIcon/></ListItemIcon><Typography>Create a teamspace</Typography></ListItem>
      <ListItem><ListItemIcon><WidgetsOutlinedIcon/></ListItemIcon><Typography>Templates</Typography></ListItem>
      <ListItem><ListItemIcon><DownloadOutlinedIcon/></ListItemIcon><Typography>Import</Typography></ListItem>
      <ListItem><ListItemIcon><DeleteOutlineOutlinedIcon/></ListItemIcon><Typography>Trash</Typography></ListItem>
    </List>
  )
}
export default NavigationMenuHeader