import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./LogIn.css";
import { styled } from "@mui/material/styles";
import { Snackbar, Button } from "@mui/material";

const LoginButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 400,
  fontFamily: "Inter",
  padding: "15px",
  width: "50%",
  border: "none",
  borderRadius: "5px",
  lineHeight: 1.5,
  backgroundColor: "#ff0000",
  color: "#fff",
  marginLeft: "23%",
  "&:hover": {
    backgroundColor: "#000",
  },
});

const LogIn = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4040/login", {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const { userId } = data;
        // Store the user ID in local storage
        localStorage.setItem("userId", userId);

        props.handleLogin(username, username); // Call handleLogin if login is successful
        history.push("/reco");
      } else {
        setError("Login failed! Incorrect password or login.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
          <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
          action={
            <Button color="secondary" size="small" onClick={handleCloseSnackbar}>Close</Button>
          }
          />
        </div>

        <LoginButton type="submit">Log In</LoginButton>
        <div className="form-group">
          <p>
            Don't have an account? <Link to="/signup">Sign Up here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
