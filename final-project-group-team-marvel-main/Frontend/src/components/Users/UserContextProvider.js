import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const UserContextProvider = ({ children }) => {
  const { user } = useAuth0();
  const [userDBdetails, setUserDBdetails] = useState(null);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [authID, setAuthID] = useState();
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    const fetchUserByAuthID = async (authUserID) => {
      const res = await fetch(`http://localhost:9000/users/auth/${authUserID}`);
      const data = await res.json();

      if (!data.error) {
        setUserDBdetails(data);
      } else {
        console.log(data.error);
      }
    };

    if (isAuthenticated) {
      getIdTokenClaims().then((idTokenClaims) => {
        const authUserID = idTokenClaims.sub;
        setAuthID(authUserID);
        setEmailValue(user.email);

        fetchUserByAuthID(authUserID);
      });
    }
  }, [isAuthenticated, getIdTokenClaims, user]);

  return (
    <UserContext.Provider value={userDBdetails}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
