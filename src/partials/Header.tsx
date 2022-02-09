import React, { useState } from "react"
import Cart from "../components/Cart"
import { Products } from "../models/Products"

const Header = (products: Products) => {
    // const [product, setProduct] = useState<Products[]>([])

    return (
        <div>
            <h1>Jokkes Goggle Shop</h1>
            <Cart id={products.id} image={products.image} productName={products.productName} description={products.description} facts={products.facts} price={products.price} quantity={products.quantity}/>
        </div>
    )
}

export default Header