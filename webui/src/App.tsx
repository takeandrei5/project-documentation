import { NavbarLayout } from './layouts';
import { MainLayout } from './layouts/MainLayout';

function App() {
	return (
		// <MainLayout>
		//   <div>
		//     <button>Click me</button>
		//   </div>
		// </MainLayout>

		<NavbarLayout leftComponent={<div>Left</div>} rightComponent={<div>Right</div>} />
	);
}

export default App;
