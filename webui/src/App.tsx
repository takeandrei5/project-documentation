import { NavbarLayout } from './layouts';
import {NavigationMenu} from './modules/NavigationMenu'

function App() {
  return (
    <NavbarLayout leftComponent={<NavigationMenu/>} rightComponent={<div>Right</div>}/>
  )
}

export default App
