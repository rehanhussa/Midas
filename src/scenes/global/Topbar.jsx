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

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const handleLogout = () => {
      console.log('logout')
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload();
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
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon /> 
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <span>
            <LogoutIcon />
            </span>
          </IconButton>
        </Box>
      </Box>
    );
};

export default Topbar;
