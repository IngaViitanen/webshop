import React, { useContext, useState, useEffect } from "react";
import { MyGlobalContext } from "../context/Context";
import { CartItem, Products } from "../models/Products";
import shoppingBag from "../images/shopping-bag.png"
import loginlogo from "../images/login.png"
import Card from "../components/card/Card"
import Login from "./user/Login";

interface Props {
    product: Products[]
    cartitem: CartItem
}

const Cart = ({product, cartitem}: Props) => {
    const [showCart, setShowCart] = useState(false)
    const {cart, setCart} = useContext(MyGlobalContext)

    // const [quantity, SetQuantity] = useState(1)
    const [cartStorage, setCartStorage] = useState(localStorage.getItem('cart-products') || '[]')
    // const [price, setPrice] = useState(products)
    const [total, setTotal] = useState(0)
    const [message, setMessage] = useState('')
    const [value, setValue] = useState(1)

    const updCart = [...cart]
    console.log(updCart)
    
    
    const c = (item: any, id: Products['id']) => {
        // const prodIndex = updCart.findIndex(prod => prod.id === cart.id)
        // if(item.key === id){
        //     item.cartQuantity = item.cartQuantity + 1
        //     // item.quantity = item.quantity -1
        //     // updatePro({...cart, quantity: cart.quantity})
        //     console.log(item)
        //     // setProducts(cart)
        //    //  return
        //    //  updateStorage(product)
        //    // return
        //    }
        // for( let i = 0; i < cart.length; i++) {
        //     if(item[i].id !== id ){
        //         console.log('did not exist before')
        //     }
        //             else if( item[i].id == id ) {
        //                 console.log('does exist')
        //     }
        // }
    }



    // console.log(cartStorage)

    const cartCalculator = () => {

        if(cart !== undefined){
            // let cartQuantity = {...cartitem, cartQuantity: cartitem.cartQuantity}
            // console.log('cartQantity..........', cartQuantity)

            // let cartTotal = cart.map((cart: any) => cart.price )
            // console.log('total.......', cartTotal)

            // let cartKey = cart.map((cart: any) => cart.id)
            // console.log(cartKey)
            
            // if( cartTotal.reduce((prev: any, curr: any) => prev + curr, -1) === -1 ){
            //     setMessage('Your cart is empty')
            // } else{
            //     let sum = cartTotal.reduce((prev: any, curr: any) => prev + curr )
            //     setMessage('')
            //     setTotal(sum)
            //     console.log(sum)
            // }
        }
        
        // c(cart)

        // console.log(cartTotal.reduce((prev: any, current: any) => prev + current ))


        setShowCart(!showCart)
    }
    

    useEffect( () => {
            let storage: CartItem[]
            // console.log(cartStorage)
                if (cartStorage !== null) {
                    try {
                        storage = JSON.parse(cartStorage)
                        // console.log(cartStorage)
                        setCart(storage)
                        console.log('useEffect', storage)
                    } catch (e) { console.log('error') }
                }
	}, [setCart])
    
    console.log('floor', cart)

    return (
        <div className="test">
            <div >
            {/* <Login /> */}
            <img src={shoppingBag} 
            alt="Shopping bag icons created by CreativeCons - Flaticon" 
            height="50px" 
            onClick={ () => cartCalculator() }
            className="logos"/>
            </div>
            {showCart ? 
            <div className="dropdown-cart">
                <h2>Your cart</h2>

                <ul data-testid="cart-list" className="cart-list">
                    <p>{message}</p>
                    <div data-testid="cart">
                        {cart ? cart.map((item: any) => (
                            <li className="c-list" key={item.ogProduct.id}>
                                <p className="p">{item.ogProduct.productName}</p>
                                <div id="quantity">
                                <p className="p">{item.ogProduct.price}:-</p>

                                <button >-</button>

                                {/* <p className="p">{item.cartQuantity}</p> */}

                                <button >+</button>
                                
                                </div>
                            </li>
                        )) : ''}
                        <p>Total: {total} kr</p>
                        <button>PURCHASE</button>
                    </div>
                        
                </ul>

            </div>
            : null}
        </div>
    )
}

export default Cart