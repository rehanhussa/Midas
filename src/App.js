import { useState, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Transactions from "./scenes/transactions";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/index";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthContext } from './context/AuthContextComponent';
import Login from "./scenes/loginPage";
import Signup from "./scenes/signup";
import ProtectecRoute from './components/ProtectedRoute';
import Chart from "./components/Portfolio";
import Portfolio from "./scenes/portfolio";
import Stock from "./scenes/stockbyid";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  // Check if the current route is /auth/signin or /auth/signup
  const isAuthRoute = location.pathname === '/auth/signin' || location.pathname === '/auth/signup';

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isAuthRoute && (
            <>
              <ProtectecRoute>
                <Sidebar isSidebar={isSidebar} />
              </ProtectecRoute>

            </>
          )}
          <main className="content">
              <ProtectecRoute>
              {!isAuthRoute && (<Topbar setIsSidebar={setIsSidebar} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />) }
              </ProtectecRoute>
            <Routes>
              <Route path="/auth/signin" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/" element={<ProtectecRoute><Chart /></ProtectecRoute>} />
              <Route path="/stocks" element={<ProtectecRoute><Dashboard /></ProtectecRoute>} />
              <Route path="/form" element={<ProtectecRoute><Form /></ProtectecRoute>} />
              <Route path="/bar" element={<ProtectecRoute><Bar /></ProtectecRoute>} />
              <Route path="/pie" element={<ProtectecRoute><Pie /></ProtectecRoute>} />
              <Route path="/line" element={<ProtectecRoute><Line /></ProtectecRoute>} />
              <Route path="/geography" element={<ProtectecRoute><Geography /></ProtectecRoute>} />
              <Route path="/faq" element={<ProtectecRoute><FAQ /></ProtectecRoute>} />
              <Route path="/calendar" element={<ProtectecRoute><Calendar /></ProtectecRoute>} />
              <Route path="/transactions" element={<ProtectecRoute><Transactions /></ProtectecRoute>} />
              <Route path="/portfolio" element={<ProtectecRoute><Portfolio /></ProtectecRoute>} />
              <Route path="/stocks/:id" element={<ProtectecRoute><Stock/></ProtectecRoute>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
