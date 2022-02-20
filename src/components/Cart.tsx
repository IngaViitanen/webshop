import React, { useContext, useState, useEffect } from "react";
import { MyGlobalContext } from "../context/Context";
import { CartItem, Products } from "../models/Products";
import shoppingBag from "../images/shopping-bag.png"
interface Props {
    product: Products
    cartitem: CartItem
}

const Cart = ({product, cartitem}: Props) => {
    const [showCart, setShowCart] = useState(false)
    const {cart, setCart} = useContext(MyGlobalContext)
    const [listProduct, setListProduct] = useState(product)

    const [cartStorage, setCartStorage] = useState(localStorage.getItem('cart-products') || '[]')
    const [total, setTotal] = useState(0)
    const [message, setMessage] = useState('')
    const [soldOutMessage, setSoldOutMessage ] = useState('')


    useEffect(() => {
        if(cart !== undefined){
            let cartTotal = cart.map((cart: any) => cart.price )
            
            if( cartTotal.reduce((prev: any, curr: any) => prev + curr, -1) === -1 ){
                setMessage('Your cart is empty')
                setTotal(0)
            }
            else{
                let totalOfOneItem = cart?.map((cart:any) => { return {...cart, totalPrice: cart.price * cart.cartQuantity} })
                let newPrice = totalOfOneItem.map((cart: any) => cart.totalPrice)
                let sumOfEverything = newPrice.reduce((prev:any, curr: any) => prev + curr)
                
                setMessage('')
                setTotal(sumOfEverything)
            }
        }
    })


    useEffect( () => {
        let storage: [] = []
            if (cartStorage !== null) {
                try {
                    storage = JSON.parse(cartStorage)
                    setCart(storage)
                } catch (e) { console.log('error') }
            } 
    }, [])


    useEffect( () => {
        localStorage.setItem('cart-products', JSON.stringify(cart))
    }, [cart])
        

    const increaseItem = (btnID: any, id: any) => {
        const increase = cart?.map((cart:any) => cart.id === btnID ? {...cart, cartQuantity: cart.cartQuantity +1, quantity: cart.quantity -1} : cart)
        const foundItem = cart.find((item: any) => item.id === id);
        console.log(foundItem?.quantity > 1)
        
        if(foundItem?.quantity > 0){      
            setCart(increase)
            localStorage.setItem('cart-products', JSON.stringify(increase))       
        }else{
            setSoldOutMessage("Oh no! We don't have any more of " + foundItem.productName + " in stock 😢")
        } 
    }


    const decreaseItem = (btnID: any, id: any, product: Products) => {
        const decrease = cart?.map((cart:any) => cart.id === btnID ? {...cart, cartQuantity: cart.cartQuantity -1, quantity: cart.quantity +1} : cart)
        const foundItem = cart.find((item: any) => item.id === id);
        console.log(foundItem?.cartQuantity > 1)

        if(foundItem?.cartQuantity > 1){
            setCart(decrease)
            localStorage.setItem('cart-products', JSON.stringify(decrease))
            setSoldOutMessage('')
        }
        else{
            deleteItem(id)
        }
    }


    const deleteItem = (id: any) => {
        let filteredCart = cart.filter(function(c: any) { return c.id !== id})
        console.log(filteredCart)
        setCart(filteredCart)
    }
    
    
    
    console.log('floor', cart)

    return (
        <div className="test">
            <div >
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
                                <button onClick={() => decreaseItem(item.id, item.id, product)} >-</button>
                                <p className="p">{item.cartQuantity}</p>
                                <button disabled={false} onClick={() => increaseItem(item.id, item.id)} >+</button>
                                <button onClick={() => deleteItem(item.id)}>delete</button>                               
                                </div>
                            </li>
                        )) : ''}
                        
                        <p>{soldOutMessage}</p>
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