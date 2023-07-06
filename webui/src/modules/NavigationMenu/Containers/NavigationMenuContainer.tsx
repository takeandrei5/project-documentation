import * as React from 'react'
import {Box} from '@mui/material'
import {FC} from 'react'
import NavigationMenuHeader from '../Components/NavigationMenuHeader'
import NavigationMenuBody from '../Components/NavigationMenuBody'

const NavMenu:FC = ({}) => {

  return (
    <Box>
      <NavigationMenuHeader/>
      <NavigationMenuBody/>
      <NavigationMenuHeader/>
    </Box>

  )
}

export default NavMenu