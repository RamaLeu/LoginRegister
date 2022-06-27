import React from 'react'

function ItemCard({ data }) {
    console.log(localStorage.getItem('cart'))
    let m = localStorage.getItem('cart')


    return (
        <div>
            {data.map((data, index) =>
                <ul key={index}>
                    <li>{data._id}</li>
                    <li>{data.username}</li>
                    <li>{data.email}</li>
                    <li>{data.type}</li>
                </ul>
            )}
        </div >
    )
}

export default ItemCard