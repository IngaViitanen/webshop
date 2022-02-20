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
    const [soldOutMessage, setSoldOutMessage ] = useState('')

    
    

    // const cartCalculator = () => {

    useEffect(() => {
        if(cart !== undefined){
    
            let cartTotal = cart.map((cart: any) => cart.price )
            
            if( cartTotal.reduce((prev: any, curr: any) => prev + curr, -1) === -1 ){
                setMessage('Your cart is empty')
                setTotal(0)
            } else{
    
                let totalOfOneItem = cart?.map((cart:any) => { return {...cart, totalPrice: cart.price * cart.cartQuantity} })
                let newPrice = totalOfOneItem.map((cart: any) => cart.totalPrice)
                let sumOfEverything = newPrice.reduce((prev:any, curr: any) => prev + curr)
                // console.log(sumOfEverything)
                
                setMessage('')
                setTotal(sumOfEverything)
            }
        }
    })

        

    const increaseItem = (btnID: any, id: any) => {
        const upitem = cart?.map((cart:any) => cart.id === btnID ? {...cart, cartQuantity: cart.cartQuantity +1, quantity: cart.quantity -1} : cart)
        console.log(upitem)
        let checkQuantity = cart.map((cart: any) => cart.quantity )

        let checkifzero = checkQuantity.reduce((prev: any, curr: any) => prev + curr) === 0
        console.log(checkifzero)

        console.log('INCREASE', cart?.find((cart:any) => cart.id === cart.id ? {...cart, cartQuantity: cart.cartQuantity +1} : cart) )
        
        if(btnID === id){
            if(!checkifzero){
                setCart(upitem)
                localStorage.setItem('cart-products', JSON.stringify(upitem))          
            } else if(checkifzero){
                console.log('THERE IS NOTHING LEFT')
                setSoldOutMessage('This item has been sold out')
            }
        } 
    }


    const decreaseItem = (btnID: any, id: any) => {
        const downitem = cart?.map((cart:any) => cart.id === btnID ? {...cart, cartQuantity: cart.cartQuantity -1, quantity: cart.quantity +1} : cart)
        console.log(downitem)

        let checkQuantity = cart.map((cart: any) => cart.cartQuantity )
        console.log(checkQuantity)

        let checkifzero = checkQuantity.reduce((prev: any, curr: any) => prev - curr) === -1
        console.log(checkifzero) // loops through all to see if there prev value - current value is 0 instead of one item
        // let checkQuantity = cart.map((cart: any) => cart.cartQuantity )
        // console.log(( checkQuantity.reduce((prev: any, curr: any) => prev + curr) === 1))
            if(btnID === id){
                if(btnID === id && !checkifzero){
                    setCart(downitem)
                    localStorage.setItem('cart-products', JSON.stringify(downitem))
                } else if(btnID === id && checkifzero){
                    console.log('THIS ITEM SHOULD BE REMOVED')
                    console.log(id)
                    deleteIfZero(id)
                    // if not work set message insted to be 'item needs to have a minimum value of one'
                }
        }
        //if quantity 0 it deletes the item
    }

    const deleteIfZero = (id: any) => {
        let array= [...cart]
        let index = id

        // if(btnID === id){
            array.splice(index, 1)
            setCart(array)
        // }
    }

    const deleteItem = (id: any) =>{
        let array = [...cart]
        console.log(id)
        let index = id

        array.splice(index, 1)
        localStorage.setItem('cart-products', JSON.stringify(array))
        setCart(array)
    }
    

    useEffect( () => {
            let storage: [] = []
            // console.log(storage)
                if (cartStorage !== null) {
                    try {
                        storage = JSON.parse(cartStorage)
                        setCart(storage)
                        console.log('useEffect', storage)
                    } catch (e) { console.log('error') }
                } else{
                    localStorage.setItem('cart-products', JSON.stringify(cart))
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
                        {cart ? cart.map((item: any, index:any) => (
                            <li className="c-list" key={item.id}>
                                <p className="p">{item.productName}</p>
                                <div id="quantity">
                                <p className="p">{item.price}:-</p>

                                <button onClick={() => decreaseItem(item.id, item.id)} >-</button>

                                <p className="p">{item.cartQuantity}</p>

                                <button onClick={() => increaseItem(item.id, item.id)} >+</button>

                                <button onClick={() => deleteItem(index)}>delete</button>
                                
                                </div>
                                <p>{soldOutMessage}</p>
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