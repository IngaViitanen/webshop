import React, { useState } from "react";
import {Products} from "../../models/Products"
import "./Card.css"

interface Props {
    product: Products
}

const Card = ({product}: Props) => {
    const [showDetails, setShowDetails] = useState(false)


    return(
        <div>
             <li key={product.id} className="card" onClick={() => setShowDetails(!showDetails)}>
                <img src={product.image} alt={product.productName} height="160px"/>
                <div className="card-grid">
                <p>{product.productName}</p>
                <p>{product.price}</p>
                </div>

                {showDetails ? (
                <div data-testid="details">
                    <p>{product.description}</p>
                    {product.facts.map(fact => ( 
                    <p>{fact}</p>
                    ))} 
                    <p>Items left: {product.quantity}</p>
                    <div className="add">
                        <button>Add to cart</button>
                    </div>
                </div>
                ) : null}

            </li>
        </div>
    )
}

export default Card