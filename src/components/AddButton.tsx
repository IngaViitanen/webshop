import React from 'react'
import { Products } from '../models/Products'

function AddButton(product: Products) {

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

  return (
    <div>
         <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  )
}

export default AddButton