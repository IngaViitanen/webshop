import React, { useState, useEffect } from "react";
import { Products } from "../models/Products";
import shoppingBag from "../images/shopping-bag.png"
import loginlogo from "../images/login.png"
import Card from "../components/card/Card"

const Cart = (products: Products) => {
    const [cart, setCart] = useState(false)
    const [items, setItems] = useState([products])
    // const [price, setPrice] = useState(products)
    const [total, setTotal] = useState(0)

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
                    // cartCalculator(total)
                    // setShowCard(!showCard)
                    console.log(storage) 
                } catch (e) { console.log('error') }
            }
	}, [products])
    
    // console.log(products.price)
    // console.log(items) //properties are empty

    const cartCalculator = (price: Products['price']) => {
        if(price !== null){
            console.log(price)
            // setPrice(products.price)
            // setTotal(total + price)
        }
        setCart(!cart)
    }

    return (
        <div>
            <div className="cartButtons" >
            <img className="logos" src={loginlogo} alt="Login icons created by Good Ware - Flaticon" height="50px" />
            <img src={shoppingBag} 
            alt="Shopping bag icons created by CreativeCons - Flaticon" 
            height="50px" 
            onClick={() => cartCalculator(products.price)}
            className="logos" />
            </div>
            {cart ? 
            <div>
                <h2>Your cart</h2>

                <ul data-testid="cart-list">
            
                    <div data-testid="cart">
                        {items.map(item => (
                            <li key={item.id}>
                                <p>{item.productName}</p>
                                <p>{item.price}:-</p>
                            </li>
                        ))}
                        <p>Total: {total} kr</p>
                    </div>
            
                </ul>

            </div>
            : null}
        </div>
    )
}

export default Cart