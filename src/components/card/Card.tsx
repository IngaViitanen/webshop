import React, { useState } from "react";
import {Products} from "../../models/Products"
import "./Card.css"

interface Props {
    product: Products[]
    // updateCart: (newItem: Products) => void
}

const Card = ({product}: Props) => {
    const [showDetails, setShowDetails] = useState(false)
    const [products, setProducts] = useState(product)

    const addToCart = (product: Products) => {
        storeCart(product)
        // console.log(storeCart)
        console.log(product)
    }

    const storeCart = (item: Products) => {
        let cartProduct: Array<object> | null = []
        let storage = localStorage.getItem('cart-products')

        if(storage){
            try {
                cartProduct = JSON.parse(storage)
                cartProduct?.push(item)
                localStorage.setItem('cart-products', JSON.stringify(cartProduct))
            } catch(e) {
                console.log('Failed to add item to cart')
            }
        } else {
            localStorage.setItem('cart-products', JSON.stringify(product))
        }
    }

    return(
        <div>

            {products.map((product) => (
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
                        <button key={product.id} onClick={() => addToCart(product)}>Add to cart</button>
                    </div>
                </div>
                ) : null}
            </li>
            ))}
        </div>
    )
}

export default Card