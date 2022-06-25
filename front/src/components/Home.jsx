import React, { useState, useEffect } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ItemCard from './ItemCard';

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
        // let tempArr = [...itemArray]
        // // tempArr.push(data)
        // console.log(itemArray)
        // setItemArray([...itemArray, item])
        localStorage.setItem("cart", JSON.stringify(tempArr));
        // setCartItemsCount(cartCount + 1)
    };

    function clearUser() {
        setCurrentUser('');
        setCurrentUserToken('');
        if(localStorage.getItem('Token')){
            localStorage.removeItem('Token');
            localStorage.removeItem('cart');
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

    return (
        <div>
            <SignUp />
            {/* <Link to="/login" setRender={setRender} setCurrentUser={setCurrentUser}>Login</Link> */}
            <Login setCurrentUser={setCurrentUser} setCurrentUserToken={setCurrentUserToken} />

            {!currentUserToken ? (
                <p>You have no access</p>
            ) :
                <>
                    /'Tipo cart img cia'/<div>{cartCount}</div>
                    <ItemCard data={itemArray} />
                    <h3>Hello, {currentUser.username}</h3>
                    <button onClick={(e) => clearUser(e)}>Log out</button>
                    <br />
                    <div>
                        {users.map((data) =>
                            <ul key={data._id}>
                                <li>{data._id}</li>
                                <li>{data.username}</li>
                                <li>{data.email === undefined ? 'No email' : data.email}</li>
                                <li>{data.type}</li>
                                <button onClick={() => addToCart(data)}>+ Add me to list</button>
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