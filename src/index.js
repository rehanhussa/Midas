import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextComponent from './context/AuthContextComponent';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <BrowserRouter>
    <AuthContextComponent>
      <App />
      </AuthContextComponent>
    </BrowserRouter>
    
);