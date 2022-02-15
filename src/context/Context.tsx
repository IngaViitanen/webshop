import React, { useContext, createContext, useState } from 'react'
import { Products } from '../models/Products'

    export const MyGlobalContext = createContext<Products | any>([])

    export type GlobalContext = {
        products: Products[]
        cart: Products
        setProducts:any
        setCart: any
    }

    
    
    export default function ContextProvider (props: any) {
            const [products, setProducts] = useState<Products[] | []>([])
            const [cart, setCart] = useState<Products | []>([])
            return (
                <MyGlobalContext.Provider value={{products, setProducts, cart, setCart}}>
                    {props.children}
                </MyGlobalContext.Provider>
            )
        }


