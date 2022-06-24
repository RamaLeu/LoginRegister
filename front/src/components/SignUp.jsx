import React, { useState } from 'react'

function SignUp() {

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confPassword, setConfPassword] = useState("");

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
            .then(data => {
                console.log(data)
                if (typeof Storage !== "undefined") {
                    localStorage.setItem('Token', JSON.stringify(data));
                } else {
                    alert('Sorry! No web storage support...')
                }
            });
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={(e) => { registerUser(e) }}>
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder='username'></input>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='email'></input>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='password'></input>
                <input type="password" onChange={(e) => { setConfPassword(e.target.value) }} placeholder='confirm password'></input>
                <input type="submit" value="register"></input>
            </form>
        </div>
    )
}

export default SignUp