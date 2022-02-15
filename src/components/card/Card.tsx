
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
    const [showDetails, setShowDetails] = useState(false)
    const [products, setProduct ]= useState(product)
    const {cart, setCart} = useContext(MyGlobalContext)
    const [quantity, SetQuantity] = useState(q)
    console.log(quantity)

    const addToCart = (product: Products) => {
        if(cart !== undefined){
            const newCartArr = [...cart, product]
            console.log(...cart)
            console.log('newCartArr', newCartArr)
            SetQuantity(quantity -1)
            setCart(newCartArr)
            storeCart(product)
            // console.log(storeCart)
            console.log(product)
        }
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

            {products.map((product: any) => (
                <li key={product.id} className="card" onClick={() => setShowDetails(!showDetails)}>
                <img src={product.image} alt={product.productName} height="160px"/>
                <div className="card-grid">
                <p>{product.productName}</p>
                <p>{product.price}:-</p>
                </div>

                {showDetails ? (
                <div key={product.id + 'key'} data-testid="details">

                    <p>{product.description}</p>
                    
                    {product.facts.map((fact: any) => ( 
                    <p>{fact}</p>
                    ))} 

                    <p>Items left: {quantity}</p>

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