import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { type AuthenticationGuardProps } from './types';

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        Loading ...
      </div>
    ),
  });

  return <Component />;
};

export default AuthenticationGuard;