import { NavbarLayout } from '../../../layouts'
import { NavbarLayoutLeftSide, NavbarLayoutRightSide } from '../components'

const DashboardContainer: React.FC = () => {
  return <NavbarLayout leftComponent={<NavbarLayoutLeftSide />} rightComponent={<NavbarLayoutRightSide />} />
}

export default DashboardContainer