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
import { CssBaseline, List, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthContext } from './context/AuthContextComponent';
import Login from "./scenes/loginPage";
import Signup from "./scenes/signup";
import ProtectedRoute from './components/ProtectedRoute';
import Investment from "./scenes/investments";
import Stock from "./scenes/stockbyid";
import StocksList from "./scenes/list";
import Portfolio from "./components/Portfolio";
import StockContext from "./context/StockContext";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [stockSymbol, setStockSymbol] = useState('');
  const location = useLocation();

  // Check if the current route is /auth/signin or /auth/signup
  const isAuthRoute = location.pathname === '/auth/signin' || location.pathname === '/auth/signup' || location.pathname === '/';

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <CssBaseline />
        <div className="app">
          {!isAuthRoute && (
            <>
              <ProtectedRoute>
                <Sidebar isSidebar={isSidebar} />
              </ProtectedRoute>

            </>
          )}
          <main className="content">
            <ProtectedRoute>
              {!isAuthRoute && (<Topbar setIsSidebar={setIsSidebar} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />)}
            </ProtectedRoute>
            <Routes>
              <Route path="/" element={<Login />} /> 
              <Route path="/auth/signin" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path="/bar" element={<ProtectedRoute><Bar /></ProtectedRoute>} />
              <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
              <Route path="/list" element={<ProtectedRoute><List /></ProtectedRoute>} />
              <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
              <Route path="/geography" element={<ProtectedRoute><Geography /></ProtectedRoute>} />
              <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/investments" element={<ProtectedRoute><ProtectedRoute><Investment /></ProtectedRoute></ProtectedRoute>} />
              <Route path="/stocks/:id" element={<ProtectedRoute><ProtectedRoute><Stock /></ProtectedRoute></ProtectedRoute>} />
              <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
              <Route path="/stocks" element={<ProtectedRoute><StocksList /></ProtectedRoute>} />
              <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
        </StockContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
