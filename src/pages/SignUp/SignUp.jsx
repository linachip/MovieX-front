
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const SignupButton = styled(Button)({
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

const SignUp = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const json = JSON.stringify({
      username: username,
      password: password,
    });

    try {
      const response = await fetch("http://localhost:4040/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.userId; // Extract the userId from the response
        console.log(userId)

        localStorage.setItem("userId", userId);

        props.handleLogin(username, username); // Call handleLogin if signup is successful
        history.push("/reco");
      } else {
        console.log("Error registering user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <form className="form-signup" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        </div>
        <SignupButton type="submit">Sign Up</SignupButton>
        <div className="form-group">
          <p>
            Already have an account? <Link to="/login">Log In here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
