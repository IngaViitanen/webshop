import React, { useState } from "react"
import Cart from "../components/Cart"
import { Products } from "../models/Products"
import bigLogo from "../images/logo.png"
import smallLogo from "../images/JGS.png"
import Logo from "../images/jokkesgoggleshopLOGO.png"
import "./header.css"

const Header = (products: Products) => {
    const [logo, setLogo] = useState(smallLogo)

    

    // if(width > 700){
    //     setLogo(bigLogo)
    // }

    return (
        <header>
            {/* <span></span> */}
            <img id="logo" src={bigLogo} alt="logo made by Inga Viitanen" height="32px"/>
            <Cart id={products.id} image={products.image} productName={products.productName} description={products.description} facts={products.facts} price={products.price} quantity={products.quantity}/>
        </header>
    )
}


export default Header