import React from "react";
import {Products} from "../models/Products"
import "./Card.css"

interface Props {
    product: Products
}

const Card = ({product}: Props) => {


    return(
        <div>
             <li key={product.id} className="card">
                <img src={product.image} alt={product.productName} height="110px"/>
                <div className="card-grid">
                <p>{product.productName}</p>
                <p>{product.price}</p>
                </div>

                {/* <p>{product.description}</p> */}
                    {/* {product.facts.map(fact => (
                    <p>{fact}</p>
                    ))} */}
                {/* <p>Items left: {product.quantity}</p> */}
                <div className="add">
                <button>Add to cart</button>
                </div>
            </li>
        </div>
    )
}

export default Card