import React, { useState, useEffect, useContext } from "react"
import Cart from "../components/Cart"
import { CartItem, Products } from "../models/Products"
import bigLogo from "../images/logo.png"
import "./header.css"
import Login from "../components/user/Login"
import { MyGlobalContext } from "../context/Context"

interface Props {
    product: Products
}

const Header = ({product}: Props, cartitem: CartItem) => {
    const {cart, setCart} = useContext(MyGlobalContext)
    const [loggedin, setLoggedin] = useState<boolean>(false)
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('login') || '{}' ))

    useEffect( () => {
        setLoggedin(JSON.parse(localStorage.getItem('loggedin') || '{}' ).loggedin)
        setUserStorage(userStorage)
    }, [])

    useEffect(() => {
        setUserStorage(userStorage)
    }, [loggedin])

    const updateProductsQuantity = (id: string) => {
        let productsArr = localStorage.getItem('products') && JSON.parse(localStorage.getItem('products') || '[]')
        let deletedItem = productsArr.filter((p: Products) => p.id === id)[0]
        deletedItem.quantity = 5
        let deletedIndex = productsArr.findIndex((p: Products) => p.id === id)
        const productCopy = productsArr.slice()
        productCopy[deletedIndex] = deletedItem
        localStorage.setItem('products', JSON.stringify(productCopy))
    }
    
    const deleteItem = (id: string) => {
        let filteredCart = cart.filter((c) => { return c.id !== id})
        setCart(filteredCart)
        updateProductsQuantity(id)
    }
    
    return (
        <header>
            <img id="logo" src={bigLogo} alt="logo made by Inga Viitanen" height="32px"/>
            <div className="cartButtons">
            <Login loggedin={loggedin} setLoggedin={setLoggedin}/>
            <Cart product={product} cartitem={cartitem} deleteItem={deleteItem}/>
            </div>
        </header>
    )
}


export default Header