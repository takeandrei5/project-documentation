import Split from 'react-split'
import {Box} from '@mui/material'

import {type NavbarLayoutProps} from './types'

const NavbarLayout:React.FC<NavbarLayoutProps> = ({leftComponent, rightComponent}:NavbarLayoutProps) => {
  return (
    <Split className="split" gutterSize={8} sizes={[20, 80]} snapOffset={0}>
      <Box sx={{minWidth: '40%'}}>{leftComponent}</Box>
      <Box sx={{minWidth: '20%', backgroundColor: '#FFFFFF'}}>{rightComponent}</Box>
    </Split>
  )
}

export default NavbarLayout
