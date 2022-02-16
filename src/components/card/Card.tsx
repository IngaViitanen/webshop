
import React, { useContext, useState } from "react";
import { MyGlobalContext } from "../../context/Context";
import {Products} from "../../models/Products"
import "./Card.css"
import Cart from "../Cart"

interface Props {
    product: Products[]
    q: Products['quantity']
}

const Card = ({product, q}: Props) => {
    const [products, setProduct ]= useState(product)
   

    return(
        <div>

            {products.map((product: any) => (
                <li key={product.id} className="card" >
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