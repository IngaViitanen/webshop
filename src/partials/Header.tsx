import React, { useState, useEffect } from "react"
import Cart from "../components/Cart"
import { CartItem, Products } from "../models/Products"
import bigLogo from "../images/logo.png"
import "./header.css"
import Login from "../components/user/Login"

const Header = (product: Products, cartitem: CartItem) => {
    const [loggedin, setLoggedin] = useState<boolean>(false)
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('login') || '{}' ))

    useEffect( () => {
        setLoggedin(JSON.parse(localStorage.getItem('loggedin') || '{}' ).loggedin)
        setUserStorage(userStorage)
    }, [])

    useEffect(() => {
        setUserStorage(userStorage)
    }, [loggedin])
    
    
    return (
        <header>
            <img id="logo" src={bigLogo} alt="logo made by Inga Viitanen" height="32px"/>
            <div className="cartButtons">
            <Login loggedin={loggedin} setLoggedin={setLoggedin}/>
            <Cart product={product} cartitem={cartitem} />
            </div>
        </header>
    )
}


export default Header