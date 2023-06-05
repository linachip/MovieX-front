import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#fff",
    },
  },
});

const Header = ({ loggedIn, username, handleLogout }) => {
  const navigate = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    navigate.push('/history');
  };
  return (
    <header>
      <div className="container flexSB">
        <nav className="flexSB">
          <div className="logo">
            <img src="./images/logo.png" alt="" />
          </div>
          <ul className="flexSB">
            <li><a href="/">Home</a></li>
            <li><a href="/aboutus" path="AboutUs">About Us</a></li>
            <li><a href="/feedback" path="Feedback">Feedback</a></li>
          </ul>
        </nav>
        <div className="account flexSB">
          <ThemeProvider theme={theme}>
          {loggedIn ? (
        <>
          <IconButton onClick={handleOpenMenu}>
            <AccountCircle color="primary" />
          </IconButton>
          <Typography variant="subtitle1" color="primary" pl={1}>
            {username}
          </Typography>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>History</MenuItem>
            </Menu>
            <Link to="/">
            <Button variant="outlined" color="primary" pl={2} onClick={handleLogout} className="btn-logout">Log Out</Button>
            </Link>
          </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="text" color="secondary" className="btn-login">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outlined" color="primary" className="btn-signup">Sign Up</Button>
                </Link>
              </>
            )}
          </ThemeProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
