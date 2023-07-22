import { useAuth0LoginProvider } from './hooks';
import { type Auth0LoginProviderProps } from './types';

const Auth0LoginProvider: React.FC<Auth0LoginProviderProps> = ({ children }: Auth0LoginProviderProps) => {
	useAuth0LoginProvider();

	return <>{children}</>;
};

export default Auth0LoginProvider;
