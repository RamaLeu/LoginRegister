import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [users, getUsers] = useState([]);
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confPassword, setConfPassword] = useState("");
  let [loginUsername, setLoginUsername] = useState("");
  let [loginPassword, setLoginPassword] = useState("");
  let [currentUser, setCurrentUser] = useState("");
  const [render, setRender] = useState(false);

  function registerUser(e) {
    e.preventDefault();
    let data = {
      "username": username,
      "email": email,
      "password": password,
      "passwordConfirm": confPassword,
      "type": "admin"
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:3001/api/v1/auth/signup', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }


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
        console.log(data);
        setCurrentUser(data.user)
        setRender(prevState => !prevState)
      });
  }

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:3001/api/v1/auth', requestOptions)
      .then(response => response.json())
      .then(result => {
        getUsers(result.data.user)
      });
  }, [render])


  return (
    <div className="App">
      <h2>Register</h2>
      <form onSubmit={(e) => { registerUser(e) }}>
        <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder='username'></input>
        <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='email'></input>
        <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='password'></input>
        <input type="confPassword" onChange={(e) => { setConfPassword(e.target.value) }} placeholder='confirm password'></input>
        <input type="submit" value="register"></input>
      </form>

      <h2>Login</h2>
      <form onSubmit={(e) => { loginUser(e) }}>
        <input type="text" onChange={(e) => { setLoginUsername(e.target.value) }} placeholder='username'></input>
        <input type="password" onChange={(e) => { setLoginPassword(e.target.value) }} placeholder='password'></input>
        <input type="submit" value="login"></input>
      </form>


      {!currentUser ? <h6>User not logged in</h6> : <h3>Hello, {currentUser.username}</h3>}

      {users.map((data) =>
        <ul key={data._id}>
          <li>{data._id}</li>
          <br />
          <li>{data.username}</li>
          <li>{data.email === undefined ? 'No email' : data.email}</li>
          <li>{data.type}</li>
        </ul>
      )}
    </div>
  );
}

export default App;
