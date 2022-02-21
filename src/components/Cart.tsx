import React, { useContext, useState, useEffect, ContextType } from "react";
import { MyGlobalContext } from "../context/Context";
import { CartItem, Products } from "../models/Products";
import shoppingBag from "../images/shopping-bag.png"
import trashCan from "../images/garbage.png"

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
            let cartTotal = cart?.map((cart) => cart.ogProduct.price )
            
            if( cartTotal?.reduce((prev, curr) => prev + curr, -1) === -1 ){
                setMessage('Your cart is empty')
                setTotal(0)
            }
            else{
                let totalOfOneItem = cart?.map((cart) => { return {...cart, totalPrice: cart.ogProduct.price * cart.cartQuantity} })
                let newPrice = totalOfOneItem?.map((cart: any) => cart.totalPrice)
                let sumOfEverything = newPrice?.reduce((prev:any, curr: any) => prev + curr)
                
                setMessage('')
                setTotal(sumOfEverything)
            }
    })


    useEffect( () => {
        let storage: [] = []
            if (cartStorage !== null) {
                try {
                    storage = JSON.parse(cartStorage)
                    setCart(storage)
                } catch (e) { console.log('unable to get storage') }
            } 
    }, [])


    useEffect( () => {
        localStorage.setItem('cart-products', JSON.stringify(cart))
    }, [cart])
        

    const increaseItem = (btnID: any, id: any) => {
        // product = 
        // const ogProductCopy = cart.map(c => c.ogProduct)
        // const ogog = ogProductCopy.map(p => p.quantity -1)
        console.log(cart.map((cart) => cart.ogProduct.id === btnID ? {...cart, cartQuantity: cart.cartQuantity +1, quantity: cart.ogProduct.quantity -1 } : cart))
        const increase = cart.map((cart) => cart.ogProduct.id === btnID ? {...cart, cartQuantity: cart.cartQuantity +1, quantity: cart.ogProduct.quantity -1 } : cart)
        const foundItem = cart.find((item) => item.ogProduct.id === id);
        // console.log(foundItem!.ogProduct.quantity > 1)
        
        if(foundItem!.ogProduct.quantity > 0){      
            setCart(increase)
            localStorage.setItem('cart-products', JSON.stringify(increase))       
        }else{
            setSoldOutMessage("Oh no! We don't have any more of " + foundItem!.ogProduct.productName + " in stock 😢")
        } 
    }


    const decreaseItem = (btnID: any, id: any, product: Products) => {
        const decrease = cart.map((cart) => cart.ogProduct.id === btnID ? {...cart, cartQuantity: cart.cartQuantity -1, quantity: cart.ogProduct.quantity +1} : cart)
        const foundItem = cart.find((item) => item.ogProduct.id === id);
        console.log(foundItem!.cartQuantity > 1)

        if(foundItem!.cartQuantity > 1){
            setCart(decrease)
            localStorage.setItem('cart-products', JSON.stringify(decrease))
            setSoldOutMessage('')
        }
        else{
            deleteItem(id)
        }
    }


    const deleteItem = (id: any) => {
        let filteredCart = cart.filter(function(c) { return c.ogProduct.id !== id})
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

                        { cart?.map((item) => (
                            <li className="c-list" key={item.ogProduct.id}>
                                <img src={item.ogProduct.image} alt={item.ogProduct.image} height="60px"/>
                                <p className="p">{item.ogProduct.productName}</p>
                                <div id="quantity">
                                <p className="p">{item.ogProduct.price} SEK</p>
                                <p className="btn" onClick={() => decreaseItem(item.ogProduct.id, item.ogProduct.id, product)} >-</p>
                                <p className="p">{item.cartQuantity}</p>
                                <p className="btn" onClick={() => increaseItem(item.ogProduct.id, item.ogProduct.id)} >+</p>
                                {/* <button className="deleteBTN" onClick={() => deleteItem(item.id)}>X</button>   */}
                                <img src={trashCan} alt="Trash icons created by Freepik - Flaticon" height="25px" className="deleteBTN" onClick={() => deleteItem(item.ogProduct.id)}/>                             
                                </div>
                            </li>
                        )) }

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