import React, { createContext, useState } from 'react'
import { CartItem, Products } from '../models/Products'


    export type GlobalContext = {
        products: Products[]
        cart: CartItem[]
        setProducts: (productsArray: Products[]) => void
        setCart: (cartArray: CartItem[]) => void
    }

    export const MyGlobalContext = createContext<GlobalContext>({} as GlobalContext) // | any> []
    
    
    export default function ContextProvider (props: any) {
            const [products, setProducts] = useState<Products[]>([] as Products[])
            const [cart, setCart] = useState<CartItem[]>([] as CartItem[])
            return (
                <MyGlobalContext.Provider value={{products, setProducts, cart, setCart}}>
                    value={{products, setProducts, cart, setCart}}
                    {props.children}
                </MyGlobalContext.Provider>
            )
        }


