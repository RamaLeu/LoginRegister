import React from 'react'

function UserList({ users, addToCart }) {
    return (
        <ul key={users._id}>
            <li>{users._id}</li>
            <li>{users.username}</li>
            <li>{users.email === undefined ? 'No email' : users.email}</li>
            <li>{users.type}</li>
            <button onClick={() => addToCart(users)}>+ Add me to list</button>
            <hr />
        </ul>
    )
}

export default UserList