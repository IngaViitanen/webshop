import React, { useState, useContext } from "react";
import { CartItem, Products } from "../../models/Products";
import {MyGlobalContext} from '../../context/Context'

interface Props{
    details: Products
    id: string
    updateProduct: (updated: Products) => void
    item: CartItem
}

const Details = ({details, item, updateProduct, id}: Props) => {
    const [detail, setDetail] = useState(details)
    const {cart, setCart} = useContext(MyGlobalContext)
    const {products, setProducts} = useContext(MyGlobalContext)
    const [cartArray, setCartArray] = useState<CartItem[]>([])
    // const [cartitem, setCartitem] = useState<CartItem>()
    // const citem = {...detail, cartQuantity: 1}


    const addToCart = (cartitem: CartItem) => { // CartItem ?
        // console.log(updProd[prodIndex])
        
        if(cart !== undefined){

             
             
            //  const cartitemCopy = {...cartitem, cartQuantity: +1}
            //  console.log('CARTITEMCOPY::::::', cartitemCopy)

            //  setCart((cartArray: CartItem[]) => {

            const storeCartItem = {...detail, cartQuantity: +1, quantity: detail.quantity -1}

            const newCartArr = [...cart, storeCartItem]
            console.log('newCartArr', newCartArr)
           

            const isItemInCart = cart?.find((cart:any) => cart.id === detail.id ) 
            console.log(isItemInCart)

                if(!isItemInCart){
                    setCart(newCartArr)
                    storeCart(storeCartItem)
                    console.log('new item in cart')
                } else if(isItemInCart){
                    console.log('found matching item')
                    setCart(() => {
                       return cart?.map((cart:any) => cart.id === detail.id ? {...cart, cartQuantity: cart.cartQuantity +1} : cart) 
                    })
                    storeCart({...cart, cartQuantity: cart.cartQuantity +1} )
                    // console.log(storeCart)
                }            
            
            const productCopy = {...details, quantity: details.quantity -1}
            setDetail(productCopy)
            updateProduct(productCopy)
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
	

    const storeCart = (item: any) => {
        let cartProduct: Array<object> | null = []
        // let matching: Array<object>
        let storage = localStorage.getItem('cart-products')
        const isItemInCart = cart?.find((cart:any) => cart.id === detail.id ) 
        console.log(isItemInCart)

        if(storage && !isItemInCart){
            try {
                cartProduct = JSON.parse(storage)
                cartProduct?.push(item)
                localStorage.setItem('cart-products', JSON.stringify(cartProduct))
            } catch(e) {
                console.log('Failed to add item to cart')
            }
        } 
        // else if(storage && isItemInCart){
        //     try{
        //         cartProduct = JSON.parse(storage)
        //         console.log('found match in storage', isItemInCart)
        //         const updateCartitem = cartProduct?.find((c) => c === detail ? item : cartProduct)
        //         // console.log(cartProduct?.find((c:any) => c.id === detail.id ? {...cart, cartQuantity: cart.cartQantity +1}: cartProduct))
        //         console.log(updateCartitem)
        //         // cart?.map((cart:any) => cart.id === detail.id ? {...cart, cartQuantity: cart.cartQuantity +1} : cart)
        //         localStorage.setItem('cart-products', JSON.stringify(cartProduct))
        //         console.log(storage)
        //     }catch(e){
        //         console.log('failed to update cartitem')
        //     }
        // }
        else {
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