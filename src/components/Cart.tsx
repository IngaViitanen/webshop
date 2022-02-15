import React, { useContext, useState, useEffect } from "react";
import { MyGlobalContext } from "../context/Context";
import { Products } from "../models/Products";
import shoppingBag from "../images/shopping-bag.png"
import loginlogo from "../images/login.png"
import Card from "../components/card/Card"

interface Props {
    product: Products[]
    // q: Products['quantity']
}

const Cart = ({product}: Props) => {
    const [showCart, setShowCart] = useState(false)
    const {cart, setCart} = useContext(MyGlobalContext)
    // const [quantity, SetQuantity] = useState(1)
    const [cartStorage, setCartStorage] = useState(localStorage.getItem('cart-products'))
    // const [price, setPrice] = useState(products)
    const [total, setTotal] = useState(0)
    const [message, setMessage] = useState('')

    console.log(cart)

    const cartCalculator = () => {

        let cartQuantity = cart.map((cart:any) => cart.cartQuantity)
        console.log('quantity', cartQuantity)
        
        let cartTotal = cart.map((cart: any) => cart.price )
        console.log('total', cartTotal)

        // console.log(cartTotal.reduce((prev: any, current: any) => prev + current ))

       

        if( cartTotal.reduce((prev: any, curr: any) => prev + curr, -1) === -1 ){
            setMessage('Your cart is empty')
        } else{
            let sum = cartTotal.reduce((prev: any, curr: any) => prev + curr )
            setMessage('')
            setTotal(sum)
            console.log(sum)
        }

        setShowCart(!showCart)
    }
    

    useEffect( () => {
            let storage: [] = []
            console.log(cartStorage)
                if (cartStorage !== null) {
                    try {
                        storage = JSON.parse(cartStorage)
                        setCart(storage)
                        // console.log('useEffect', cart)
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
            onClick={ () => cartCalculator() }
            className="logos" />
            </div>
            {showCart ? 
            <div className="dropdown-cart">
                <h2>Your cart</h2>

                <ul data-testid="cart-list">
                    <p>{message}</p>
                    <div data-testid="cart">
                        {cart ? cart.map((item: any) => (
                            <li key={item.id}>
                                <p>{item.productName}</p>
                                <p>{item.price}:-</p>
                                <p>{item.cartQuantity}</p>
                            </li>
                        )) : ''}
                        <p>Total: {total} kr</p>
                    </div>
            
                </ul>

            </div>
            : null}
        </div>
    )
}

export default Cart