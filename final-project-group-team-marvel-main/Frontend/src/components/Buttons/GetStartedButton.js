import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const GetStartedButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button className="cta-button" onClick={handleSignUp}>
      Join The Community Today!
    </button>
  );
};

export default GetStartedButton;
