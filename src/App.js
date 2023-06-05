import "./index.css";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header/Header.jsx";
import HomeCard from "./components/home/HomeCard";
import AboutUs from "./pages/AboutUs/AboutUs";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Feedback from "./pages/Feedback/Feedback";
import Recognition from "./pages/Recognition/Recognition";
import History from "./pages/History/History";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();

  const handleLogin = (userId, username) => {
    setUsername(username);
    setLoggedIn(true);
    setUserId(userId);
  };

  const handleLogout = () => {
    setUsername("");
    setLoggedIn(false);
  };
  return (
    <div className="container">
      <Router>
        <Header
          loggedIn={loggedIn}
          username={username}
          handleLogout={handleLogout}
        />
        <Route exact path="/" component={HomeCard}></Route>
        <Route exact path="/aboutus" component={AboutUs}></Route>
        <Route exact path="/feedback" component={Feedback}></Route>
        <Route exact path="/history" component={History}></Route>
        {/* <Route exact path='/reco' component={Recognition}></Route> */}
        <Route
          exact
          path="/reco"
          render={() => <Recognition userId={userId} />}
        ></Route>
        <Route path="/login">
          <LogIn handleLogin={handleLogin}/>
          {/* <LogIn setToken={setToken} /> */}
        </Route>
        <Route path="/signup">
          <SignUp handleLogin={handleLogin} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
