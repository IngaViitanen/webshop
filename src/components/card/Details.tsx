import React, { useState, useContext } from "react";
import { Products } from "../../models/Products";
import {MyGlobalContext} from '../../context/Context'

interface Props{
    details: Products[]
    id: Products['id']
}

const Details = ({details, id}: Props) => {
    const [detail, setDetail] = useState(details)
    const {cart, setCart} = useContext(MyGlobalContext)
    // const [quantity, SetQuantity] = useState(q)
    // console.log(quantity)

    const addToCart = (product: Products) => {
        if(cart !== undefined){
            const newCartArr = [...cart, product]
            console.log(...cart)
            console.log('newCartArr', newCartArr)
            // SetQuantity(quantity -1)
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
            localStorage.setItem('cart-products', JSON.stringify(detail))
        }
    }
    

    const filterDetails = detail.filter(filterDetails => filterDetails.id === id)

    return(
        <div>
            {filterDetails.map(detail => (
                <div key={detail.id} data-testid="details">
                   
                   <img src={detail.image} alt={detail.productName} height="160px"/>
                    
                    <p>{detail.productName}</p>
                    <p>{detail.price}:-</p>

                    <p>{detail.productName}</p>
                    <p>{detail.description}</p>
                    
                    {detail.facts.map((fact: any) => ( 
                    <p>{fact}</p>
                    ))} 

                    <p>Items left: {detail.quantity}</p>

                    <div className="add">
                        <button key={detail.id} onClick={() => addToCart(detail)}>Add to cart</button>
                    
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Details