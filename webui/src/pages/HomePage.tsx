import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';

const HomePage: React.FC = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	return (
		<Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			Hello from home!
			{!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button>}
			{isAuthenticated && <button onClick={() => logout()}>Log out</button>}
		</Box>
	);
};

export default HomePage;
