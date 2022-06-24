import React, { useState, useEffect } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ItemCard from './ItemCard';

function Home() {
    const [users, getUsers] = useState([]);
    let [currentUser, setCurrentUser] = useState("");
    let [cartCount, setCartItemsCount] = useState(0);
    let [itemArray, setItemArray] = useState([]);
    const [seeItems, setSeeItems] = useState(false);

    const saveToCart = (data) => {
        setItemArray(data)
        console.log(itemArray)
        setCartItemsCount(cartCount + 1)
    }
    function clearUser() {
        setCurrentUser('')
        localStorage.removeItem('Token');
    }

    useEffect(() => {
        if (localStorage.Token === undefined) {
            <></>
        } else {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`
                }
            };
            fetch('http://localhost:3001/api/v1/auth', requestOptions)
                .then(response => response.json())
                .then(res => {
                    getUsers(res.data.user)
                });
        }
    }, [])

    return (
        <div>
            <SignUp />
            {/* <Link to="/login" setRender={setRender} setCurrentUser={setCurrentUser}>Login</Link> */}
            <Login setCurrentUser={setCurrentUser} />

            {!currentUser ? (
                <p>You have no access</p>
            ) :
                <>
                    <button onClick={setSeeItems}>/'Tipo cart img cia'/<div>{cartCount}</div></button>
                    {seeItems &&
                        <ItemCard />
                    }
                    <h3>Hello, {currentUser.username}</h3>
                    <h4>Your current token is: <br />{localStorage.getItem('Token')}</h4>
                    <button onClick={(e) => clearUser(e)}>Log out</button>
                    <br />
                    <div>
                        {users.map((data) =>
                            <ul key={data._id}>
                                <li>{data._id}</li>
                                <li>{data.username}</li>
                                <li>{data.email === undefined ? 'No email' : data.email}</li>
                                <li>{data.type}</li>
                                <button onClick={() => saveToCart(data)}>+ Add me to list</button>
                                <hr />
                            </ul>
                        )}
                    </div>
                </>
            }
        </div>
    )
}
export default Home