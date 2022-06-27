import React, { useState, useEffect } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ItemCard from './ItemCard';
import Search from './Search';
import UserList from './UserList';

function Home() {
    const [users, getUsers] = useState([]);
    let [currentUser, setCurrentUser] = useState("");
    let [currentUserToken, setCurrentUserToken] = useState(localStorage.Token);
    let [cartCount, setCartItemsCount] = useState(0);
    const [itemArray, setItemArray] = useState([]);
    const [seeItems, setSeeItems] = useState(false);
    const [cart, setCart] = useState(localStorage.getItem('cart'));

    const addToCart = (data) => {
        let tempArr = [...itemArray];
        tempArr.push(data);
        setItemArray(tempArr);
        localStorage.setItem("cart", JSON.stringify(tempArr));
        setCartItemsCount(cartCount + 1)
    };

    function clearUser() {
        setCurrentUser('');
        setCurrentUserToken('');
        if (localStorage.getItem('Token')) {
            localStorage.removeItem('Token');
            localStorage.removeItem('cart');
            localStorage.removeItem('User');
        }
    }

    useEffect(() => {
        if (currentUserToken) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUserToken}`
                }
            };
            fetch('http://localhost:3001/api/v1/auth', requestOptions)
                .then(response => response.json())
                .then(res => {
                    getUsers(res.data.user);
                });
        }
    }, [currentUserToken, setCurrentUserToken]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart'));
        if (items) {
            setItemArray(items);
        }
    }, []);

    return (
        <div>
            <SignUp />
            {/* <Link to="/login" setRender={setRender} setCurrentUser={setCurrentUser}>Login</Link> */}
            <Login setCurrentUser={setCurrentUser} setCurrentUserToken={setCurrentUserToken} itemArray={itemArray} />

            {!currentUserToken ? (
                <p>You have no access</p>
            ) :
                <>
                    <div>{cartCount}</div>

                    <ItemCard data={itemArray} setCurrentUserToken={setCurrentUserToken} />

                    <h3 >Hello, {currentUser.username}</h3>
                    <button onClick={(e) => clearUser(e)}>Log out</button>
                    <br />
                    <Search details={users} />
                    <div>
                        {users.map((data) =>
                            <UserList
                                users={data}
                                addToCart={addToCart}
                            />
                        )}
                    </div>
                </>
            }
        </div>
    )
}
export default Home