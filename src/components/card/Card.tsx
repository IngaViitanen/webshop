
import React, { useContext, useState } from "react";
import { MyGlobalContext } from "../../context/Context";
import {Products} from "../../models/Products"
import "./Card.css"
import Cart from "../Cart"

interface Props {
    product: Products[]
    q: Products['quantity']
    whenClick: (id: string) => void
}

const Card = ({product, q, whenClick}: Props) => {
    const [products, setProduct ]= useState(product)
    
    

   

    return(
        <div>

            {products.map((product: Products) => (
                <li key={product.id} className="card" onClick={(id) => whenClick(product.id)}>
                <img id="card-img" src={product.image} alt={product.productName} height="160px"/>
                <div className="card-grid">
                <p>{product.productName}</p>
                <p>{product.price}:-</p>
                </div>
            </li>
            ))}
        </div>
    )
}

export default Card