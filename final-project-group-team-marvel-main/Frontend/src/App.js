// App.js
import React, { useContext } from "react";
import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/LandingPage/LandingPage";
import { Profile } from "./pages/Profile/Profile";
import { AuthenticationGuard } from "./components/Auth/auth-guard";
import { CallbackPage } from "./pages/CallBack/callback-page";
import Home from "./pages/Home/Home";
//import Feed from "./pages/Feed";
import Schools from "./pages/UniversityList/UniversityList";
import Location from "./pages/Location/Location";
import CreatePost from "./pages/PostComments/CreatePost";
//import CreateComment from "./pages/PostComments/CreateComment";
import UserContext from './components/Users/UserContext';
import SinglePostView from "./components/Posts/SinglePostView";
import SideNavBar from './components/SideNav/SideNavBar';
//import { useComments } from "./components/CommentsContextProvider";

export const App = () => {
  const userDBdetails = useContext(UserContext);
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render SideNavBar based on current URL */}
      {location.pathname !== "/" && <SideNavBar />}

      <SideNavBar />

      <>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/profile"
            element={<AuthenticationGuard component={Profile} />}
          />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:postId" element={<SinglePostView userDBdetails={userDBdetails} />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/location" element={<Location />} />
          <Route
            path="/createpost"
            element={
              <AuthenticationGuard
                component={(props) => <CreatePost {...props} userDBdetails={userDBdetails} />}
              />
            }
          />
        </Routes>
      </>
    </div>
  );
};
