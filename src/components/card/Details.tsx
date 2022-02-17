import React, { useState, useContext } from "react";
import { CartItem, Products } from "../../models/Products";
import {MyGlobalContext} from '../../context/Context'

interface Props{
    details: Products
    id: string
    updateProduct: (updated: Products) => void
    item: CartItem
    // setProductsData: (data: Products[]) => void
}

const Details = ({details, item, updateProduct}: Props) => {
    const [detail, setDetail] = useState(details)
    const {cart, setCart} = useContext(MyGlobalContext)
    const {products, setProducts} = useContext(MyGlobalContext)
    const [cartArray, setCartArray] = useState<CartItem[]>([])
    // const [cartitem, setCartitem] = useState<CartItem>()
    // const carttt = cart.find((c) => )
    // const citem = {...detail, cartQuantity: 1}


    const addToCart = (cartitem: CartItem) => { // CartItem ?
        // console.log(updProd[prodIndex])
        
        if(cart !== undefined){

             const productCopy = {...details, quantity: details.quantity -1}
             setDetail(productCopy)
             updateProduct(productCopy)
             
             const cartitemCopy = {...cartitem, cartQuantity: +1}
             console.log('CARTITEMCOPY::::::', cartitemCopy)

             const isItemInCart = cartArray.find(c => c.ogProduct.id === detail.id)
             console.log(isItemInCart)
            //  const update = [ ...productsData, product.quantity ]
            //  console.log('data.........', productsData[0])

            //  const newupd = { ...productsData[0], quantity: update }
            //  console.log('newupd............', newupd)

            const newCartArr = [...cart, {...detail, cartQuantity: +1}]
            // console.log(...cart)
            console.log('newCartArr', newCartArr)
            setCart(newCartArr)
            storeCart(cartitem)
        }

        
    }

    // const updateStorage = (product: Products) => {
    //     let storage: [] = []
    //     const products = localStorage.getItem('products')
    //     if (products !== null) {
    //         try {
    //             storage = JSON.parse(products)
    //             localStorage.setItem('products', JSON.stringify(productsData))
    //         } catch (e) { console.log('error') }
    //     }
    // }
	

    const storeCart = (item: CartItem) => {
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
            localStorage.setItem('cart-products', JSON.stringify(cart))
        }
    }
    

    
    // console.log(products[id])
    

    

    return(
        <div>
            
                <div data-testid="details">
                   
                   <img src={detail.image} alt={detail.productName} height="160px"/>
                    
                    <p>{detail.productName}</p>
                    <p>{detail.description}</p>
                    
                    {detail.facts.map((fact: any) => ( 
                        <p key={fact}>{fact}</p>
                    ))} 

                    <p>{detail.price}:-</p>
                    <p>Items left: {detail.quantity}</p>

                    <div className="add">
                        <button key={detail.id} onClick={() => addToCart(item)}>Add to cart</button>
                    
                    </div>
                </div>
            
        </div>
    )
}

export default Details