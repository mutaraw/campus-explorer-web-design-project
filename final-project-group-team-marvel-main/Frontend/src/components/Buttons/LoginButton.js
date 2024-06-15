import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };
  // const handleLogin = async () => {
  //     await loginWithRedirect();
  //   };

  return (
    <button className="login" onClick={handleLogin}>
      Login
    </button>
  );
};

export default LoginButton;
