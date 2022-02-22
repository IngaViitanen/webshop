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
    
    const deleteItem = (id: any) => {
        let filteredCart = cart.filter((c) => { return c.id !== id})
        console.log(filteredCart)
        setCart(filteredCart)
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