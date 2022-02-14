import React, { useContext, useState, useEffect } from "react";
import { MyGlobalContext } from "../context/Context";
import { Products } from "../models/Products";
import shoppingBag from "../images/shopping-bag.png"
import loginlogo from "../images/login.png"
import Card from "../components/card/Card"

interface Props {
    product: Products[]
}

const Cart = ({product}: Props) => {
    const [showCart, setShowCart] = useState(false)
    const {cart, setCart} = useContext(MyGlobalContext)
    const [cartStorage, setCartStorage] = useState(localStorage.getItem('cart-products'))
    // const [price, setPrice] = useState(products)
    const [total, setTotal] = useState(0)

    const cartCalculator = (price: Products['price']) => {
        // if(price !== null){
            // console.log(price)
            // setPrice(products.price)
            // setTotal(total + price)
        // }
        setShowCart(!showCart)
    }

    useEffect( () => {
            let storage: [] = []
            console.log(cartStorage)
                if (cartStorage !== null) {
                    try {
                        storage = JSON.parse(cartStorage)
                        setCart(storage)
                        console.log('useEffect', cart)
                    } catch (e) { console.log('error') }
                }
	}, [setCart])
    
    console.log('floor', cart)

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
            {showCart ? 
            <div className="dropdown-cart">
                <h2>Your cart</h2>

                <ul data-testid="cart-list">
            
                    <div data-testid="cart">
                        {cart.map((item: any) => (
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