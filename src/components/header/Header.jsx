import React, { useState } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isHomePage = location.pathname === "/";
  const isAboutUsPage = location.pathname === "/aboutus";

  return (
    <header>
      <div className="container flexSB">
        <nav className="flexSB">
          <div className="logo">
            <img src="./images/logo.png" alt="" />
          </div>
          <ul className="flexSB">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
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
                  {(isHomePage || isAboutUsPage) && (
                    <MenuItem onClick={handleCloseMenu}>
                      <Link to="/history">History</Link>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="text"
                    color="secondary"
                    className="btn-login"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="outlined"
                    color="primary"
                    className="btn-signup"
                  >
                    Sign Up
                  </Button>
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
