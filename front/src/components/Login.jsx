import React, { useState } from 'react';
// import { Link, Navigate } from "react-router-dom";

function Login({ setCurrentUser, setCurrentUserToken }) {

  let [loginUsername, setLoginUsername] = useState("");
  let [loginPassword, setLoginPassword] = useState("");
  let [rememberMe, setRememberMe] = useState(false)

  function loginUser(e) {
    e.preventDefault();
    let loginData = {
      "username": loginUsername,
      "password": loginPassword,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    };
    fetch('http://localhost:3001/api/v1/auth/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        setCurrentUser(data.data.user);
        setCurrentUserToken(data.token);
        if(rememberMe){
          localStorage.setItem("Token", data.token);
          localStorage.setItem("User", [data.data.user.username]);
        }
        // if (rememberMe) {
        //   localStorage.getItem("Token")
        // }
        // setTimeout(function () {
        //   <Navigate to="/" replace={true} />
        // });
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => { loginUser(e) }}>
        <input type="text" onChange={(e) => { setLoginUsername(e.target.value) }} placeholder='username'></input>
        <input type="password" onChange={(e) => { setLoginPassword(e.target.value) }} placeholder='password'></input>
        <input type="submit" value="login"></input>
        <input type="checkbox" id="loginRememberMe" name="rememberMe" onClick={() => { setRememberMe(!rememberMe) }}></input><label htmlFor="rememberMe">Remember me</label>
      </form>
    </div>
  )
}

export default Login
