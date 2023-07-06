import { useAuth0 } from "@auth0/auth0-react";

const HomePage: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return <>
    <div>Hello from home!</div>
      {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button>}
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </>

}

export default HomePage;