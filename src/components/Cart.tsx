import React, { useState, useEffect } from "react";
import { Products } from "../models/Products";
import shoppingBag from "../images/shopping-bag.png"
import loginlogo from "../images/login.png"
import Card from "../components/card/Card"

interface Props {
    product: Products[]
}

const Cart = ({product}: Props) => {
    const [cart, setCart] = useState(false)
    const [cartStorage, setCartStorage] = useState(localStorage.getItem('cart-products'))
    // const [items, setItems] = useState(JSON.parse(cartStorage!))
    const [items, setItems] = useState(product)
    // const [price, setPrice] = useState(products)
    const [total, setTotal] = useState(0)

    const cartCalculator = (price: Products['price']) => {
        if(price !== null){
            console.log(price)
            // setPrice(products.price)
            // setTotal(total + price)
        }
        setCart(!cart)
    }

    const handleCart = (item: Products) => {
        const newArr = [...items, item]
        console.log('cart', newArr)
        setItems(newArr)
    }

    useEffect( () => {
            let storage: [] = []
            console.log(cartStorage)
                if (cartStorage !== null) {
                    try {
                        storage = JSON.parse(cartStorage)
                        console.log(storage)
                        setItems(storage)
                        console.log(storage) 
                    } catch (e) { console.log('error') }
                }
	}, []) //setProducts here
    
    console.log(items)
    console.log(product) //properties are empty

    return (
        <div>
            <div className="cartButtons" >
            <img className="logos" src={loginlogo} alt="Login icons created by Good Ware - Flaticon" height="50px" />
            <img src={shoppingBag} 
            alt="Shopping bag icons created by CreativeCons - Flaticon" 
            height="50px" 
            onClick={() => cartCalculator(total)}
            className="logos" />
            </div>
            {cart ? 
            <div className="dropdown-cart">
                <h2>Your cart</h2>

                <ul data-testid="cart-list">
            
                    <div data-testid="cart">
                        {items.map((item: any) => (
                            <li key={item.id}>
                                <p>{item.productName}</p>
                                <p>{item.price}:-</p>
                            </li>
                        ))}
                        {/* <Card product={items}/> */}
                        <p>Total: {total} kr</p>
                    </div>
            
                </ul>

            </div>
            : null}
        </div>
    )
}

export default Cart