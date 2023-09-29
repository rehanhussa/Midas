import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextComponent from './context/AuthContextComponent';
import { ColorModeContext, useMode } from './theme';

const RootComponent = () => {
    const [theme, colorMode] = useMode();

    return (
        <BrowserRouter>
            <AuthContextComponent>
                <ColorModeContext.Provider value={colorMode}>
                    <App />
                </ColorModeContext.Provider>
            </AuthContextComponent>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
