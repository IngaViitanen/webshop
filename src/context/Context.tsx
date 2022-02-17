import React, { useContext, createContext, useState } from 'react'
import { CartItem, Products } from '../models/Products'

    export const MyGlobalContext = createContext<Products[] | any>([])

    export type GlobalContext = {
        products: Products[]
        cart: CartItem[]
        setProducts: (productsArray: Products[]) => void
        setCart: (cartArray: CartItem[]) => void
    }

    
    
    export default function ContextProvider (props: any) {
            const [products, setProducts] = useState<Products[]>(props)
            const [cart, setCart] = useState<CartItem[]>(props)
            return (
                <MyGlobalContext.Provider value={{products, setProducts, cart, setCart}}>
                    {props.children}
                </MyGlobalContext.Provider>
            )
        }


