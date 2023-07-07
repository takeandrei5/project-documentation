import * as React from 'react'
import {Box, Divider} from '@mui/material'
import {FC} from 'react'
import NavigationMenuHeader from '../Components/NavigationMenuHeader'
import NavigationMenuBody from '../Components/NavigationMenuBody'
import NavigationMenuFooter from '../Components/NavigationMenuFooter'

const NavMenu:FC = ({}) => {

  return (
    <Box>
      <NavigationMenuHeader/>
      {/*<Divider/>*/}
      <NavigationMenuBody/>
      <Divider/>
      <NavigationMenuFooter/>
    </Box>

  )
}

export default NavMenu