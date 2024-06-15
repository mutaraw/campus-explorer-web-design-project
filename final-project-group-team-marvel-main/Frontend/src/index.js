import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "font-awesome/css/font-awesome.min.css";
import { App } from "./App";
import { Auth0ProviderWithNavigate } from "./Auth0ProviderWithNavigate.js";
import UserContextProvider from "./components/Users/UserContextProvider";
import { CommentsContextProvider } from "./components/comments/CommentsContextProvider";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <UserContextProvider>
        <CommentsContextProvider>
          <App />
          <ToastContainer />
        </CommentsContextProvider>
      </UserContextProvider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>

);
