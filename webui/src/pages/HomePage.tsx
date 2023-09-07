import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import { ButtonC } from '../components';

const HomePage: React.FC = () => {
	const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>
  }

	return (
		<Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			Hello from home!
			{!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button>}
			{isAuthenticated && (
				<button
					onClick={() => {
						logout({
              logoutParams: {
                returnTo: window.location.origin,
              }
            });
						localStorage.removeItem('authenticationFlowFinished');
					}}>
					Log out
				</button>
			)}
		</Box>
	);
};

export default HomePage;
