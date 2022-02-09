import React, { useState } from "react"
import Cart from "../components/Cart"
import { Products } from "../models/Products"

const Header = () => {
    // const [product, setProduct] = useState<Products[]>([])

    return (
        <div>
            <h1>Jokkes Goggle Shop</h1>
            <Cart id={""} image={""} productName={""} description={""} facts={[]} price={""} quantity={0}/>
        </div>
    )
}

export default Header