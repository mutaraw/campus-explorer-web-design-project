import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { CallbackPage } from "../../pages/CallBack//callback-page";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <CallbackPage />
      </div>
    ),
  });

  return <Component />;
};