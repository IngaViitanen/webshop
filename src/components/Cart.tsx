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

    const [cartStorage, setCartStorage] = useState(localStorage.getItem('cart-products') || '[]')
    const [total, setTotal] = useState(0)
    const [message, setMessage] = useState('')
    const [value, setValue] = useState(1)

    
    

    // const cartCalculator = () => {

    useEffect(() => {
        if(cart !== undefined){
            
    
            // let cartQuant = cart?.map((cart:any) => cart.cartQuantity)
            // console.log('cartQantity..........', cartQuant)
    
            // console.log('COUNTER LLLLLLLLLLLLLLL', cart?.map((cart:any) => cart.price))
    
            let cartTotal = cart.map((cart: any) => cart.price )
            // console.log('total.......', cartTotal)
    
            // let cartKey = cart.map((cart: any) => cart.id)
            // console.log(cartKey)
            // let quant = cartQuant.reduce((prev: any, curr: any) => prev + curr)
            // console.log(quant)
    
            // let sum = cartTotal.reduce((prev: any, curr: any) => prev + curr )
            
            if( cartTotal.reduce((prev: any, curr: any) => prev + curr, -1) === -1 ){
                setMessage('Your cart is empty')
            } else{
    
                let totalOfOneItem = cart?.map((cart:any) => { return {...cart, totalPrice: cart.price * cart.cartQuantity} })
                let newPrice = totalOfOneItem.map((cart: any) => cart.totalPrice)
                let sumOfEverything = newPrice.reduce((prev:any, curr: any) => prev + curr)
                console.log(sumOfEverything)
                
                setMessage('')
                setTotal(sumOfEverything)
            }
        }
    })

        

    const increaseItem = (btnID: any, id: any) => {
        const upitem = cart?.map((cart:any) => cart.id === btnID ? {...cart, cartQuantity: cart.cartQuantity +1} : cart)
        console.log(upitem)
        console.log('INCREASE', cart?.find((cart:any) => cart.id === cart.id ? {...cart, cartQuantity: cart.cartQuantity +1} : cart) )
        if(btnID === id){
            setCart(upitem)
        }
    }


    const decreaseItem = (btnID: any, id: any) => {
        const downitem = cart?.map((cart:any) => cart.id === btnID ? {...cart, cartQuantity: cart.cartQuantity -1} : cart)
        console.log(downitem)
        console.log('INCREASE', cart?.find((cart:any) => cart.id === cart.id ? {...cart, cartQuantity: cart.cartQuantity -1} : cart) )
        if(btnID === id){
            setCart(downitem)
        }
    }

    

    useEffect( () => {
            let storage: CartItem[]
            // console.log(storage)
                if (cartStorage !== null) {
                    try {
                        storage = JSON.parse(cartStorage)
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
            onClick={ () => setShowCart(!showCart) }
            className="logos"/>
            </div>
            {showCart ? 
            <div className="dropdown-cart">
                <h2>Your cart</h2>

                <ul data-testid="cart-list" className="cart-list">
                    <p>{message}</p>
                    <div data-testid="cart">
                        {cart ? cart.map((item: any) => (
                            <li className="c-list" key={item.id}>
                                <p className="p">{item.productName}</p>
                                <div id="quantity">
                                <p className="p">{item.price}:-</p>

                                <button onClick={() => decreaseItem(item.id, item.id)} >-</button>

                                <p className="p">{item.cartQuantity}</p>

                                <button onClick={() => increaseItem(item.id, item.id)} >+</button>
                                
                                </div>
                            </li>
                        )) : ''}
                        <p data-testid="total">Total: {total} kr</p>
                        <button>PURCHASE</button>
                    </div>
                        
                </ul>

            </div>
            : null}
        </div>
    )
}

export default Cart