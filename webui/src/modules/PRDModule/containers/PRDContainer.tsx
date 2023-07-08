import { NavbarLayout } from '../../../layouts';
import { NavbarLayoutLeftSide, NavbarLayoutRightSide } from '../components';

const PRDContainer: React.FC = () => {
	return <NavbarLayout leftComponent={<NavbarLayoutLeftSide />} rightComponent={<NavbarLayoutRightSide />} />;
};

export default PRDContainer;
