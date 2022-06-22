import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  var bcrypt = require('bcryptjs');
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loginUsername, setLoginUsername] = useState("");
  let [loginPassword, setLoginPassword] = useState();
  let [currentUser, setCurrentUser] = useState();

  function registerUser(e){
    e.preventDefault();
    var salt = bcrypt.genSaltSync(10);
    let data={
      "username": username,
      "password": password,
      "type": "admin",
      "salt": salt
    };
    let hashedPassword = bcrypt.hashSync(password, salt);
    data.password = hashedPassword;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
  fetch('http://localhost:3001/api/v1/auth', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }


  function loginUser(e){
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
        let hashedPassword = bcrypt.hashSync(loginData.password, data.user.salt);
        console.log(data.user.password);
        console.log(hashedPassword);
        if(data.user.password === hashedPassword){
          setCurrentUser(data.user);
        }else{
          console.log('password is incorrect');
        }
      });
  }
  return (
    <div className="App">
      <h2>Register</h2>
      <form onSubmit={(e)=>{registerUser(e)}}>
        <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder='username'></input>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'></input>
        <input type="submit" value="register"></input>
      </form>

      <h2>Login</h2>
      <form onSubmit={(e)=>{loginUser(e)}}>
        <input type="text" onChange={(e)=>{setLoginUsername(e.target.value)}} placeholder='username'></input>
        <input type="password" onChange={(e)=>{setLoginPassword(e.target.value)}} placeholder='password'></input>
        <input type="submit" value="login"></input>
      </form>




      {!currentUser ? <h6>User not logged in</h6>: <h3>Hello, {currentUser.username}</h3>}
    </div>
  );
}

export default App;
