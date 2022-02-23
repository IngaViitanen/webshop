import React, { useContext, useState, useEffect } from "react";
import { MyGlobalContext } from "../context/Context";
import { CartItem, Products } from "../models/Products";
import shoppingBag from "../images/shopping-bag.png"
import trashCan from "../images/garbage.png"

interface Props {
    product: Products
    cartitem: CartItem
    deleteItem: (id: string) => void
}

const Cart = ({product, cartitem, deleteItem}: Props) => {
    const [showCart, setShowCart] = useState(false)
    const {cart, setCart} = useContext(MyGlobalContext)
    const {products, setProducts} = useContext(MyGlobalContext)
    const [total, setTotal] = useState(0)
    const [message, setMessage] = useState('')
    const [soldOutMessage, setSoldOutMessage ] = useState('')
    const [loginMessage, setLoginMessage] = useState('')
    
    const cartStorage = localStorage.getItem('cart-products') || '[]'

    useEffect(() => {
            let cartTotal = cart?.map((cart) => cart.price )
            
            if( cartTotal?.reduce((prev, curr) => prev + curr, -1) === -1 ){
                setMessage('Your cart is empty')
                setTotal(0)
            }
            else{
                let totalOfOneItem = cart?.map((cart) => { return {...cart, totalPrice: cart.price * cart.cartQuantity} })
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
        

    const increaseItem = (id: any) => {
        const foundItem = cart.find((item) => item.id === id)
        const increase = cart.map((cart) => cart.id === id ? {...cart, cartQuantity: cart.cartQuantity +1, quantity: cart.quantity -1} : cart)
        
        let productsArr = localStorage.getItem('products') && JSON.parse(localStorage.getItem('products') || '[]')
        let increasedItem = productsArr?.filter((p: Products) => p.id === id)[0]
        if(increasedItem !== undefined){
            increasedItem!.quantity = foundItem!.quantity - 1
            let increasedIndex = productsArr?.findIndex((p: Products) => p.id === id)
            const productCopy = productsArr?.slice()
            productCopy[increasedIndex] = increasedItem
            localStorage.setItem('products', JSON.stringify(productCopy))
        }

        if(foundItem!.quantity > 0){      
            setCart(increase)
            localStorage.setItem('cart-products', JSON.stringify(increase))       
        }else{
            setSoldOutMessage("Oh no! We don't have any more of " + foundItem!.productName + " in stock 😢")
        } 
    }


    const decreaseItem = ( id: any) => {
        const decrease = cart.map((cart) => cart.id === id ? {...cart, cartQuantity: cart.cartQuantity -1, quantity: cart.quantity +1} : cart)
        const foundItem = cart.find((item) => item.id === id)
        console.log(foundItem!.cartQuantity > 1)

        let productsArr = localStorage.getItem('products') && JSON.parse(localStorage.getItem('products') || '[]')
        let decreadesedItem = productsArr?.filter((p: Products) => p.id === id)[0]
        if(decreadesedItem !== undefined){
            decreadesedItem!.quantity = foundItem!.quantity + 1
            let decreasedIndex = productsArr?.findIndex((p: Products) => p.id === id)
            const productCopy = productsArr?.slice()
            productCopy[decreasedIndex] = decreadesedItem
            localStorage.setItem('products', JSON.stringify(productCopy))
        }

        if(foundItem!.cartQuantity > 1){
            setCart(decrease)
            localStorage.setItem('cart-products', JSON.stringify(decrease))
            setSoldOutMessage('')
        }
        else{
            deleteItem(id)
        }
    }


    const pleaseLogin = () => {
        let loginStorage: {} = {}
        if(JSON.parse(localStorage.getItem('loggedin') || '{}' ) !== null){
            try{
                if(loginStorage = JSON.parse(localStorage.getItem('loggedin') || '{}' ).loggedin === true){
                    if(cart.length === 0){
                        setLoginMessage('You need to add some awesome goggles to your cart to make a purchase ! 👓')
                    }else{
                        setLoginMessage('Thank you for your NOT REAL purchase! 😎 ')
                        // Add empty cart function after making a purchase
                    }
                }else{
                    setLoginMessage('Please sign in to make a purchase !')
                }
            } catch (e) {setLoginMessage('Please sign in to make a purchase !')}
        }
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
                            <li className="c-list" key={item.id}>
                                <img src={item.image} alt={item.image} height="60px"/>
                                <p className="p">{item.productName}</p>
                                <div id="quantity">
                                <p className="p">{item.price} SEK</p>
                                <p className="btn" onClick={() => decreaseItem(item.id)} >-</p>
                                <p className="p">{item.cartQuantity}</p>
                                <p className="btn" onClick={() => increaseItem(item.id)} >+</p>
                                <img src={trashCan} alt="Trash icons created by Freepik - Flaticon" height="25px" className="deleteBTN" onClick={() => deleteItem(item.id)}/>                             
                                </div>
                            </li>
                        )) }

                        <p>{soldOutMessage}</p>
                        <p data-testid="total">Total: {total} kr</p>
                        <button onClick={() => pleaseLogin()}>PURCHASE</button>
                        <p>{loginMessage}</p>
                    </div>
                        
                </ul>

            </div>
            : null}
        </div>
    )
}

export default Cart