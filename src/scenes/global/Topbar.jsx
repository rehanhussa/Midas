import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Search from "../../components/Search";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
    const theme = useTheme();
    const currentMode = theme.palette.mode; // Get the current mode
    const colors = tokens(currentMode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      console.log('logout')
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userBalance');

      navigate("/auth/signin")
    }
  
    return (
      <Box display="flex" justifyContent="space-between" p={2} bgcolor={colors.background}>
        {/* SEARCH BAR */}
        <Box>
           <Search />
        </Box>
  
        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {currentMode === "dark" ? (
              <LightModeOutlinedIcon style={{ color: '#e0e0e0' }} />
            ) : (
              <DarkModeOutlinedIcon style={{ color: '#141414' }} />
            )}
          </IconButton>
          <IconButton style={{ color: currentMode === 'dark' ? '#e0e0e0' : '#141414' }}>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton style={{ color: currentMode === 'dark' ? '#e0e0e0' : '#141414' }}>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleLogout} style={{ color: currentMode === 'dark' ? '#e0e0e0' : '#141414' }}>
            <span>
              <LogoutIcon />
            </span>
          </IconButton>
        </Box>
      </Box>
    );
};

export default Topbar;