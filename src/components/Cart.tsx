import React, { useState, useEffect } from "react";
import { Products } from "../models/Products";
import Card from "../components/card/Card"

const Cart = (products: Products) => {
    const [cart, setCart] = useState(false)
    const [items, setItems] = useState([products])
    const [showCard, setShowCard] = useState(false)
    const [price, setPrice] = useState(0)

    useEffect( () => {
        let storage: [] = []
        const products = localStorage.getItem('cart-products')
            // if (products === null){
            //     setShowCard(showCard)
            // }
            if (products !== null) {
                try {
                    storage = JSON.parse(products)
                    console.log(storage)
                    setItems(storage)
                    setShowCard(!showCard)
                    console.log(storage) 
                } catch (e) { console.log('error') }
            }
	}, [products])
    
    console.log(items) //properties are empty

    return (
        <div>
            <button onClick={() => setCart(!cart)}>CART</button>
            {cart ? 
            <div>
                <h2>Your cart</h2>

                <ul data-testid="cart-list">
                {showCard ? (
                    <div data-testid="cart">
                        {items.map(item => (
                            <li key={item.id}>
                                <p>{item.productName}</p>
                                <p>{item.price}</p>
                            </li>
                        ))}
                    </div>
                )
                : ''} 
                </ul>

                <p>Total: {price} kr</p>
            </div>
            : null}
        </div>
    )
}

export default Cart