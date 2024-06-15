import React, { useEffect } from "react";
import "./callback-page.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {MdOutlineDirectionsRun} from 'react-icons/md';

export const CallbackPage = () => {
  // const {isAuthenticated} = useAuth0();
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   if(!isAuthenticated && window.location.pathname !== '/profile'){
  //     navigate('/profile')
  //   }
  // },[])

  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  // console.log(user)

  const checkUser = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      loginWithRedirect({
        appState: {
          returnTo: "/profile",
        },
      });
    }
  };

  const location = useLocation();
  console.log(location);

  const searchParams = new URLSearchParams(location.search);

  const errorMessage = searchParams.get("error_description");
  const error = searchParams.get("error");
  // console.log(errorMessage)

  if (error && errorMessage === "Please verify your email before logging in.") {
    return (
      <div className={"callback verify"}>
        <h1>CampusExplorer</h1>
        <p>
          Hello dear,
          <br /> We sent an email for you to complete your registration!
          <br /> Click away and <span className="loginSpan">login</span> here to
          access the brightest community. &#129299;
        </p>
        <button className="loginBtn" onClick={checkUser}>
          Login
        </button>
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <div className={"callback redirect"}>
        <p style={{ fontSize: "24px", color: "red" }}>
          Loading......................
        </p>
      </div>
    );
  }
};
